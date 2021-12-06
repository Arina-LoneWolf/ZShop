import Category from '../services/category.service.js';

const addCategory = async (req, res) => {
  try {
    const { name, categoryKey } = req.body;

    await Category.add([name, categoryKey]);

    return res.status(201).json({ message: 'Add category success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.getAll();

    category.forEach((itemCategory) => {
      for (let i = 0; i < itemCategory.types.length; i++) {
        if (
          !itemCategory.types[i].id &&
          !itemCategory.types[i].typeKey &&
          !itemCategory.types[i].typeName
        ) {
          itemCategory.types.splice(i, 1);
        }
      }
    });

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const rowType = await Category.getTypeWithCategoryId(categoryId);
    if (rowType.length !== 0) {
      return res.status(500).json({ message: "Exist type can't delete" });
    }

    const rowProduct = await Category.getProductWithCategoryId(categoryId);
    if (rowProduct.length !== 0) {
      return res.status(500).json({ message: "Exist product can't delete" });
    }

    await Category.deleteCategory(categoryId);

    return res.status(200).json({ message: 'Deleted category success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, categoryKey } = req.body;

    await Category.updateCategory([name, categoryKey, categoryId]);

    return res.status(200).json({ message: 'Update category success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
