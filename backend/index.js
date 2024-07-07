// app.js
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');
const productRouter = require('./routers/productRoutes');
const userRouter = require('./routers/userRoutes')
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
app.use(cors());
app.use('/products',productRouter);
app.use('/users' , userRouter);

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
    });
});
app.get("/", (req, res) => {
    res.send("Express app is running");
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server running on Port:" + PORT);
    } else {
        console.log("Error : " + error);
    }
});