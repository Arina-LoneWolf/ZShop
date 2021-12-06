import Type from '../services/type.service.js';

const addType = async (req, res) => {
  try {
    const { categoryId, name, typeKey } = req.body;

    await Type.add([categoryId, name, typeKey]);

    return res.status(201).json({ message: 'Add type success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteType = async (req, res) => {
  try {
    const typeId = req.params.id;
    const rowProduct = await Type.getProductWithTypeId(typeId);

    if (rowProduct.length !== 0) {
      return res.status(500).json({ message: "Exist product can't delete" });
    }

    await Type.deleteType(typeId);

    return res.status(200).json({ message: 'Delete type success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateType = async (req, res) => {
  try {
    const { categoryId, name, typeKey } = req.body;
    const typeId = req.params.id;

    await Type.updateType([categoryId, name, typeKey, typeId]);

    return res.status(200).json({ message: 'Update type success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addType,
  deleteType,
  updateType,
};
