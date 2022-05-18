"""
By: Rahul
Website: https://www.itechnolabs.biz
"""
import numpy as np
import argparse
import cv2,dlib,torch,random,os
import faceBlendCommon as fbc
from SelfiSegmentation import SelfiSegmentation
from model import UNet
from skimage.transform import resize
os.environ["KMP_DUPLICATE_LIB_OK"]="TRUE"

#%%

IMG_WIDTH ,IMG_HEIGHT ,IMG_CHANNELS ,seed =128,128,3,42
random.seed = seed
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
PREDICTOR_PATH =  "models/shape_predictor_68_face_landmarks.dat"
# Get the face detector
faceDetector = dlib.get_frontal_face_detector()
# The landmark detector is implemented in the shape_predictor class
landmarkDetector = dlib.shape_predictor(PREDICTOR_PATH)
segmentor=SelfiSegmentation()
net=cv2.dnn.readNetFromCaffe('models/MobileNetSSD_deploy.prototxt', 'models/MobileNetSSD_deploy.caffemodel')
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png','JPG','PNG','JPEG'])

#%%

def eyes_shape(shape, mask, side):
	#Get the shape of eyes
    filtered = [shape[i] for i in side]
    filtered = np.array(filtered, dtype=np.int32)
    mask = cv2.fillConvexPoly(mask, filtered, 255)
    return mask

def get_eyes_mask(points,imDlib):
	# Get mask of each eye
    mask = np.zeros(imDlib.shape[:2], dtype=np.uint8)
    left = [36, 37, 38, 39, 40, 41]
    right = [42, 43, 44, 45, 46, 47]
    mask = eyes_shape(points, mask, left)
    mask = eyes_shape(points, mask, right)
    return mask

def get_mouth(imDlib,points):

	# Get the mouth mask region

    dots_mouth = np.array(points[48:], dtype=np.int32)
    bin_mouth = np.zeros(imDlib.shape[:2], dtype=np.uint8)
    bin_mouth = cv2.fillConvexPoly(bin_mouth, dots_mouth, 255)
    
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))
    bin_mouth = cv2.morphologyEx(bin_mouth, cv2.MORPH_CLOSE, kernel)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5))
    bin_mouth = cv2.morphologyEx(bin_mouth, cv2.MORPH_OPEN, kernel)
    
    return bin_mouth

def extract_eyes_and_lips(img_path):
	# Get The image without lips and eyes
	img=cv2.imread(img_path)
	img= cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
	points = fbc.getLandmarks(faceDetector, landmarkDetector, img)
	eyes_mask = get_eyes_mask(points,img)
	back_rgb_eyes = cv2.bitwise_and(img, img, mask=(255-eyes_mask))
	mouth=get_mouth(back_rgb_eyes,points)
	mouth_rgb=cv2.bitwise_and(back_rgb_eyes, back_rgb_eyes, mask=(255-mouth))
	final_output=cv2.resize(mouth_rgb,(300,300))
	final_output= cv2.cvtColor(final_output,cv2.COLOR_RGB2BGR)
	return final_output

def resize_img(img_path): 
	 # Get resize image
	img=cv2.imread(img_path)
	img=cv2.resize(img,(300,300))
	return img

def predict_person(img_path): 
	# To Predict the person in the image
	img=resize_img(img_path)	
	(h, w) = img.shape[:2]
	blob = cv2.dnn.blobFromImage(cv2.resize(img, (300, 300)),0.007843, (300, 300), 127.5)
	net.setInput(blob)
	detections = net.forward()
	for i in np.arange(0, detections.shape[2]):
		confidence = detections[0, 0, i, 2]
		if confidence >0.20:
			idx = int(detections[0, 0, i, 1])
			if idx==15:
				box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])				
				(startX, startY, endX, endY) = box.astype("int")
				#roi=img[startY-1:startY+endY-1,startX-1:startX+endX-1]
				label = "{} {:.2f} %".format("Person",round(confidence * 100))
				return label

def bg_remove(img,bkclr=(0,0,0),threshold=0.80): 
    # To remove the background of the image
	output=segmentor.removeBG(img,bkclr,threshold)
	return output

def get_mask(img,model_path='models/final_unet_pytorch.pth',mask_threshold=128): 
  # Get mask output  using UNet architecture
  model = UNet(input_channels=3)
  model.load_state_dict(torch.load(model_path, map_location=device))
  model.eval()
  rgb_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  resized_img = np.asarray(resize(rgb_image, (IMG_HEIGHT, IMG_WIDTH), mode='constant'))
  channel_first_img = np.transpose(resized_img, (2, 0, 1))
  img_added_axis = np.expand_dims(channel_first_img, axis=0)
  input_tensor = torch.from_numpy(img_added_axis).float()
  input_tensor.to(device=device)
  preds = model(input_tensor)
  prediction = preds[0].cpu().detach().numpy()
  prediction = np.transpose(prediction, (1, 2, 0))
  prediction=prediction*255.0
  prediction=prediction.astype(np.uint8)
  ret, thresh = cv2.threshold(prediction,mask_threshold,255,cv2.RETR_TREE,cv2.CHAIN_APPROX_NONE)
  prediction = cv2.cvtColor(thresh ,cv2.COLOR_GRAY2RGB)
  skinArea=cv2.resize(prediction,(300,300))
  return skinArea

def crop(img,mask):
	# Crop the skinn region  and  find the avrage RGB values
	
	img_crop = cv2.bitwise_and(img,mask)
	img_gray = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)
	facemask = cv2.threshold(img_gray , 128, 255, cv2.THRESH_BINARY)[1]
	avrg_color_input = cv2.mean(img_crop, mask=facemask)[:3]
	return img_crop,avrg_color_input

def masking_and_colorization(file_path):
	# Check person in image and mask and crop the image
	
	label = predict_person(file_path)
	if label:
		img=resize_img(file_path)
		try:
			eyes_lips=extract_eyes_and_lips(file_path)
			output=bg_remove(eyes_lips)
			mask=get_mask(output)
			crop_skin,avrg_color_tone_input=crop(output,mask)		
		except IndexError:
			output=bg_remove(img)
			mask=get_mask(output)
			crop_skin,avrg_color_tone_input=crop(output,mask)
		return crop_skin,avrg_color_tone_input,mask,img
	else:
		label='NO Person Found'
		return None,None,None,None

def mask_person(image_path,output_path):
    crop_skin,avrg_color_tone_input,mask,img=masking_and_colorization(image_path)
    cv2.imwrite(output_path,mask)

	
#%%

if __name__=="__main__":
    parser = argparse.ArgumentParser(description='parser params')
    parser.add_argument('--img_path', type=str, required=True)
    parser.add_argument('--output_path', type=str, required=True)
    args = parser.parse_args()
    mask_person(args.img_path, args.output_path)

	

	

				

	




