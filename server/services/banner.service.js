//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const Banner = {
  add: async (bannerLink) => {
    const data = await executeQuery(
      `
        INSERT INTO Banner(bannerLink) VALUES (?)
        `,
      [bannerLink]
    );
    return data;
  },

  getAllBanners: async () => {
    const data = await executeQuery('SELECT * FROM Banner');
    return data;
  },

  updateBanner: async (bannerLink, id) => {
    const data = await executeQuery('UPDATE Banner SET bannerLink=? WHERE id=?', [bannerLink, id]);
    return data;
  },

  deleteBanner: async (bannerId) => {
    const data = await executeQuery('DELETE FROM Banner WHERE id=?', [bannerId]);
    return data;
  },
};

export default Banner;
