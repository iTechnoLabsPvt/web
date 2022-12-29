const util = require("util");
const Multer = require("multer");
const maxSize = 10 * 1024 * 1024;
const validImageTypes = ['image/jpg', 'image/png', 'image/jpeg'];

let processFile = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (validImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .mp4 and .3gpp format allowed!'));
    }
  }
}).single("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;