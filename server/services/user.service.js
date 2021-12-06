//import executeQuery from '../configs/db.config.js';
import { executeQuery } from '../helpers/database.helper.js';

const User = {
  checkUsernameAndEmail: async (infoUser) => {
    let data = await executeQuery(
      'select username from User where username=? or email=?  limit 1',
      infoUser
    );
    return data;
  },

  getInfo: async (id) => {
    const data = await executeQuery(
      `
      SELECT id, name, username, adress, phone, email, mute, district, city, confirmed, isAdmin FROM User WHERE id=?`,
      [id]
    );
    return data;
  },

  getPassword: async (id) => {
    const data = await executeQuery(
      `
    SELECT PASSWORD FROM User WHERE id=?`,
      [id]
    );
    return data;
  },

  getIdByEmail: async (email) => {
    const data = await executeQuery(
      `
      SELECT id FROM User WHERE email=?
      `,
      [email]
    );
    return data;
  },

  updatePassword: async (newPassword, id) => {
    const data = await executeQuery(
      `
      UPDATE User SET password=? WHERE id = ?`,
      [newPassword, id]
    );
    return data;
  },

  updateMute: async (mute, id) => {
    const data = await executeQuery(
      `
      UPDATE User SET mute=? WHERE id = ?`,
      [mute, id]
    );
    return data;
  },

  updateEmail: async (newEmail, id) => {
    const data = await executeQuery(
      `
      UPDATE User SET email=? WHERE id = ?`,
      [newEmail, id]
    );
    return data;
  },

  updateInfo: async (newInfo) => {
    const data = await executeQuery(
      `
      UPDATE User SET ? WHERE id = ?`,
      newInfo
    );
    return data;
  },

  register: async (newUser) => {
    const data = await executeQuery(
      'insert into User (name, username, password,email) values (?,?,?,?)',
      newUser
    );
    return data;
  },

  updateConfirmed: async (infoUser) => {
    const data = await executeQuery('update User set confirmed = ? WHERE email = ?', infoUser);
    return data;
  },

  selectLogin: async (username) => {
    const data = await executeQuery(
      'select confirmed, password, id from User where username = ?',
      username
    );
    return data;
  },
};

export default User;
