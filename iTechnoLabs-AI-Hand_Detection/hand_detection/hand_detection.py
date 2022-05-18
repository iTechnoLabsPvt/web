import cv2
import argparse
from yolo import YOLO
#%%

yolo = YOLO("models/hands-tiny.cfg", "models/hands-tiny.weights", ["Hand"])


#%%

def detect_hand(image_path,output_path):
    detection_count=0
    conf_sum =0
    img=cv2.imread(image_path)
    width, height, inference_time, results = yolo.inference(img)
    results.sort(key=lambda x: x[2])
    for detection in results:
        id, name, confidence, x, y, w, h = detection
        conf_sum += confidence
        detection_count += 1
        color = (255, 0, 255)
        cv2.rectangle(img, (x, y), (x + w, y + h), color, 1)
        cv2.imwrite(output_path,img)
    

#%%

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='parser params')
    parser.add_argument('--img_path', type=str, required=True)
    parser.add_argument('--output_path', type=str, required=True)
    args = parser.parse_args()
    detect_hand(args.img_path, args.output_path)
