import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);  // Get the file URL and convert it to path
const __dirname = path.dirname(__filename);

const file_size_limit = 10 * 1024 * 1024;   // 10MB limit

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
        cb(null, `${timestamp}-${sanitizedFilename}`);
    }
});

// File filter to accept PDFs only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: file_size_limit }
});

export default upload;