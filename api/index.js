const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const GuideService = require('./models/GuideService')
const cookieParser = require('cookie-parser');
require('dotenv').config();
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const app = express();

// TRYING TO USE MULTER TO HANDLE BACKSLASHES - CHATGPT
const path = require('path');
const { rejects } = require('assert');
// TRYING TO USE MULTER TO HANDLE BACKSLASHES - CHATGPT

// Auto generate salt to add to the encrypted password
const bcryptSalt = bcrypt.genSaltSync(10);

// Define jwt secret
const jwtSecret = 'fasdgasdgqawegqadgas';

app.use(express.json());


// PREVIOUS CODE - FROM JUL 20 - COMMENTED BELOW (Rafael - Jul 22)
// app.use('/upload', express.static(__dirname+ '/upload'));
app.use('/uploads', express.static(__dirname+'/uploads'));


// TRYING TO USE MULTER TO HANDLE BACKSLASHES - CHATGPT
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage });
// TRYING TO USE MULTER TO HANDLE BACKSLASHES - CHATGPT


app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);

// booking - Fabricio
function getUserDataFromToken(req) {
    return new promise((resolve, reject) =>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    });    
} // recortar e colar na seguinte

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


// PREVIOUS CODE - FROM JUL 20 - COMMENTED BELOW (Rafael - Jul 22)
// app.post('/upload-by-link', async (req,res) => {
//     const {link} = req.body;
//     const newName = 'photo' + Date.now() + '.jpg'
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname + 'upload',  // (Rafael) - Changed from 'upload' to '/uploads/' +newName
//     });
//     res.json(newName);
// })


// CODE WORKING - JUL 22 BELOW
// Function to download the image and save it 
async function downloadImage(link) {
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: path.join(__dirname, 'uploads', newName) // Save to uploads directory
    });
    return newName;
}

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    try {
        const filename = await downloadImage(link);
        res.json(`/uploads/${filename}`); // Send the relative path
    } catch (error) {
        res.status(500).json({ message: 'Failed to download image', error });
    }
});
// CODE WORKING - JUL 22 ABOVE




// PREVIOUS CODE - FROM JUL 20 - COMMENTED BELOW (Rafael - Jul 22)
// const photosMiddleware = multer({dest:'uploads/'});
// app.post('/upload', photosMiddleware.array('photos' , 100), async (req,res) => {
//     const uploadedFiles = [];
//     for(let i=0; i < req.files.length; i++){
//         const {path, originalname} = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path + '.' + ext;
//         fs.renameSync(path , newPath);
//         uploadedFiles.push(newPath);
//         // uploadedFiles.push(newPath.replace('uploads/' , ''));

//     }
//     res.json(uploadedFiles);
// })

// const photosMiddleware = multer({ dest: 'uploads/' });
// app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const { path: filePath, originalname } = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1]; // Corrected typo
//         const newPath = filePath + '.' + ext;
//         fs.renameSync(filePath, newPath);
//         uploadedFiles.push(newPath.replace('uploads/', ''));
//     }
//     res.json(uploadedFiles);
// });

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]; // Corrected typo
        const newPath = filePath + '.' + ext;
        fs.renameSync(filePath, newPath);
        uploadedFiles.push(`/uploads/${path.basename(newPath)}`);
    }
    res.json(uploadedFiles);
});
    


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

app.post('/guideService', (req, res) => {
    const { token } = req.cookies;
    const {
        title, city, addedPhotos, description,
        services, extraInfo, maxTravelers, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const guideServiceDoc = await GuideService.create({
            owner: userData.id, price, 
            title, city, photos:addedPhotos, description,
            services, extraInfo, maxTravelers, 
        })
        res.json(guideServiceDoc);
      });
});

// gets user services
app.get('/user-guideService', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await GuideService.find({owner:id}) );
    });
});

app.get('/guideService/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await GuideService.findById(id))
});

app.put('/guideService', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, city, addedPhotos, description,
        services, extraInfo, maxTravelers, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const guideServiceDoc = await GuideService.findById(id);
        if (userData.id === guideServiceDoc.owner.toString()) {
            guideServiceDoc.set({
                title, city, photos:addedPhotos, description,
                services, extraInfo, maxTravelers, price,
            });
            await guideServiceDoc.save();
            res.json('ok');
        }
    });
});

// gets all services
app.get('/guideService', async (req, res) => {
    res.json(
        await GuideService.find()
    );
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
});

//booking - Fabricio
app.post('/api/bookings', async (req, res) => {
    //mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const {
      place,checkIn,checkOut,numberOfTravelers,name,phone,price,
    } = req.body;
    Booking.create({
      place,checkIn,checkOut,numberOfGuests,name,phone,price,
      user:userData.id,
    }).then((doc) => {
      res.json(doc);
    }).catch((err) => {
      throw err;
    });
  });

app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('singleGuideService'))
});