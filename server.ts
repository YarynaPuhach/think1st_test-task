const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/submit', upload.single('photo'), (req, res) => {
  console.log('Form Data:', req.body);
  console.log('File Data:', req.file);

  res.json({
    message: 'Form data received successfully',
    formData: req.body,
    file: req.file
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});