const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

// Auto generate salt to add to the encrypted password
const bcryptSalt = bcrypt.genSaltSync(10);

// Define jwt secret
const jwtSecret = 'fasdgasdgqawegqadgas';

app.use(express.json());


app.use('/uploads', express.static(__dirname+ '/uploads'));

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    } 
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
        jwt.sign({
            email:userDoc.email, 
            id:userDoc._id
        }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
        });    
    } else {
        res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});


app.post('/upload-by-link', async (req,res) => {
    const{link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
         url:link,
        dest: __dirname + 'uploads',
    });
    res.json(newName);
})

const photosMiddleware = multer({dest:'upload'});
app.post('/upload', photosMiddleware.array('photos' , 100), async (req,res) => {
    const uploadedFiles = [];
    for(let i=0; i < req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.lenght - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path , newPath);
        uploadedFiles.push(newPath.replace('uploads/' , ''))

    }
    res.json(uploadedFiles);

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name, email, _id} = await User.findById(userData.id);
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.listen(4000);