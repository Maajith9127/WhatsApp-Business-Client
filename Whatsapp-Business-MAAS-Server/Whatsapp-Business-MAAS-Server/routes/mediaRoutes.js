
//Added This extra before for testing can remove this later ,-Maajith
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Store in memory (no disk write)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/meta-upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, mimetype, size } = req.file;

    console.log("Mock file uploaded:");
    console.log("Name:", originalname);
    console.log("Type:", mimetype);
    console.log("Size:", size, "bytes");

    // 🔁 Return mock Meta-style response
    const mockMediaId = `mocked_meta_id_${Date.now()}`;

    return res.status(200).json({
        message: "Mock upload successful ✅",
        media_id: mockMediaId,
        file: {
            name: originalname,
            type: mimetype,
            size: `${(size / 1024).toFixed(2)} KB`
        }
    });
});

export default router;
