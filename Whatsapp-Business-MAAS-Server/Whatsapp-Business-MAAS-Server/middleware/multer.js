import multer from 'multer';

// Use memory storage for storing files in memory (e.g., for buffer processing)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
