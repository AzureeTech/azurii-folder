const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../public/uploads/slides');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload new slide
router.post('/', upload.single('slide'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a file' });
  }
  
  res.json({ 
    filename: req.file.filename,
    path: `/uploads/slides/${req.file.filename}`
  });
});

// Get all slides
router.get('/', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to scan slides directory' });
    }
    
    const slides = files
      .filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()))
      .map(file => ({
        filename: file,
        path: `/uploads/slides/${file}`,
        createdAt: fs.statSync(path.join(uploadDir, file)).birthtime
      }));
    
    // Sort by creation date (newest first)
    slides.sort((a, b) => b.createdAt - a.createdAt);
    
    res.json(slides);
  });
});

// Delete a slide
router.delete('/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.json({ message: 'File deleted successfully' });
  });
});

module.exports = router;