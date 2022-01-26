import multer from 'multer';
// import uuid from 'uuid';
const { v4: uuidv4 } = require('uuid');
import path from 'path';

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

export default multer({ storage });
