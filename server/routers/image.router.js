import express from 'express';
import cloudinary from 'cloudinary';
import { upload } from '../helpers/uploadimage.helper.js';

const router = express.Router();

router.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const images = [];
    const id_public = [];
    const files = req.files;
    console.log(files);
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinary.v2.uploader.upload(
        path,
        {
          folder: 'ZShop',
        },
        (error, result) => {
          if (error) throw error;
          console.log(result);
        }
      );

      images.push(newPath.secure_url);
      id_public.push(newPath.public_id);
    }
    res.json({ images, id_images: id_public });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
