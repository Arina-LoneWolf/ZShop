import Banner from '../services/banner.service.js';

const addBanner = async (req, res) => {
  try {
    const countBanner = await Banner.getAllBanners();
    if (countBanner.length === 5) {
      return res.status(400).json({ message: 'Too many banners' });
    }

    const { bannerLink } = req.body;
    await Banner.add(bannerLink);
    return res.status(201).json({ message: 'Add banner success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.getAllBanners();
    return res.status(200).json({ banners });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id, bannerLink } = req.body;
    await Banner.updateBanner(bannerLink, id);
    return res.status(200).json({ message: 'Update banner success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const id = req.params.id;
    await Banner.deleteBanner(id);
    return res.status(200).json({ message: 'Delete banner success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
