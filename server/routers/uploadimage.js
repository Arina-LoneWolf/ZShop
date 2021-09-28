const router = require('express').Router();
const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

const storage = multer.diskStorage({});

const filter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg'
	) {
		cb(null, true);
	} else {
		cb({ message: 'Wrong file format' }, false);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 2 },
	fileFilter: filter,
});

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
					//upload_preset: 'ml_default',
				},
				(error, result) => {
					if (error) throw error;
					//console.log(result);
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

router.delete('/delete', async (req, res) => {
	try {
		const { public_id } = req.body;
		if (!public_id) return res.status(400).json({ msg: 'No images Selected' });

		const result = await cloudinary.v2.uploader.destroy(public_id);
		if (result) res.json({ message: 'Delete image success' });
		else res.json({ message: 'Delete image fail' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
