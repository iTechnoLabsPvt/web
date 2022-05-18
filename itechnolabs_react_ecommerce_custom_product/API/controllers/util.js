/* -----------------------------------------------------------------------
   * @ description : This is the util controller layer.
----------------------------------------------------------------------- */

const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const UPLOAD_PATH = 'assets/';
const BUCKET_NAME = 'voxcatalog.images';
const ID = 'AKIAVHCBFC4UMJINP73I';
const SECRET = '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';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});
export const downloadFile = {
  directory: {
    path: UPLOAD_PATH,
    redirectToSlash: false,
    index: false
  }
};

export const uploadFile = async (request, h) => {
  const { payload } = request;
  const file = payload['file'];

  const orignalname = file.hapi.filename;
  const filename = uuidv4() + orignalname;
  const path = `${UPLOAD_PATH}${filename}`;
  let fileDetail = new Promise((resolve, reject) => {
    const contentType = file.hapi.headers['content-type'];

    s3.upload(
      {
        Bucket: BUCKET_NAME,
        Key: 'vox/' + filename,
        Body: file,
        ContentType: contentType
      },
      (err, data) => {
        if (err) {
          request.log(['error', 'upload'], err);
          console.log(err);
          reject(err);
        }
        resolve(data.Location);
      }
    );
  });
  const fileD = await fileDetail;
  return fileD;
};
