/**
 *
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import functions from "firebase-functions";
import axios from "axios";
import cors from "cors";
import * as admin from "firebase-admin";
import express from "express";
import multer from "multer";
import path from "path";


admin.initializeApp();

const app = express();

export const config = {
  api: {
    bodyParser: false,
  },
};
// app.use(express.json());

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true}));

// const ALLOWED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/png",
//   "image/gif",
// ];

const upload = multer({
  storage: multer.memoryStorage(),
});
//   fileFilter: (req, file, cb) => {
//     if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error(
//           "Invalid file type. Only JPEG, PNG, GIF, and JPG are allowed. "
//         )
//       );
//     }
//   },
// });

app.post("/", upload.single("upload"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({error: "No File Uploaded"});
  }
  try {
    const bucket = admin.storage().bucket();
    const fileName = `{Date.now()}_${path.basename(req.file.originalname)}`;
    const file = bucket.file(fileName);

    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    res.set("Content-Type", "application/json");

    return res.json({url: publicUrl});
  } catch (error) {
    console.error("Error uploading file: ", error);
    return res.status(500).json({error: "Failed to upload Image"});
  }
});

export const uploadImage= functions.https.onRequest(app);
//   async (req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json({error: {message: "No file uploaded"}});
//       }

//       const bucket = admin.storage().bucket();

//       const file = bucket.file(
//         `${uuidv4()}${path.extname(req.file.originalname)}`
//       );
//       await file.save(req.file.buffer, {
//         metadata: {contentType: req.file.mimetype},
//         public: true,
//       });

//       const [url] = await file.getSignedUrl({
//         action: "read",
//         expires: "03-09-2491",
//       });

//       return res.status(200).json({url});
//     } catch (error) {
//       if (error instanceof Error) {
//         return res.status(500).json({error:
//           {message: error.message}});
//       } else {
//         return res.status(500).json({error: {message:
//           "An Unknown Error Occured"}});
//       }
//     }
//   });


const corsHandler = cors({origin: true});

const IFRAME_SRC = "https://cdn.iframe.ly/api/iframe";
const API_KEY = "fc86988db9e14b071f308a";

export const getMediaEmbed = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const url = req.query.url as string;
    if (!url) {
      res.status(400).send("URL parameter is required");
      return;
    }
    try {
      const response = await axios.get(
        `${IFRAME_SRC}?app=1&api_key=${API_KEY}&url=${encodeURIComponent(
          url
        )}&autoplay=1&enablejsapi=1`
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching media embed: ", error);
      res.status(500).send("Error fetching media embed: ");
    }
  });
});
