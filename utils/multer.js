// utils/multer.js
import multer from 'multer';
import path from 'path';

// Tentukan penyimpanan file lokal sementara sebelum mengunggah ke Cloudinary
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default upload;
