import './EditProduct.scss';
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastDisplayState } from '../../../../recoil/toastDisplayState';
import { productEditDisplayState } from '../../../../recoil/productEditDisplayState';
import TextError from '../../../../shared/notifications/TextError';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { IoIosClose } from "react-icons/io";
import { LoopCircleLoading } from 'react-loadingg';
import { useMutation } from 'react-query';
import categories from '../../../../shared/data/categories';
import types from '../../../../shared/data/types';
import sizes from '../../../../shared/data/sizes';
import productApi from '../../../../apis/productApi';

const schema = yup.object({
  productName: yup.string().required('*Bắt buộc'),
  productCategory: yup.string().required('*Bắt buộc'),
  productType: yup.string().required('*Bắt buộc'),
  productPrice: yup.number()
    .typeError('*Bắt buộc')
    .min(0, 'Giá không được âm'),
  productDiscount: yup.number()
    .typeError('Nhập "0" nếu không có khuyến mãi')
    .min(0, 'Khuyến mãi không được âm'),
  productQuantity: yup.number()
    .typeError('*Bắt buộc')
    .min(0, 'Số lượng không được âm'),
  productSize: yup.array().min(1, 'Chọn ít nhất 1 kích thước'),
  productImages: yup.array().min(1, 'Chọn ít nhất 1 ảnh'),
  productColors: yup.array().min(1, 'Chọn ít nhất 1 ảnh')
});

function EditProduct({ product, refetch }) {
  const [selectedImages, setSelectedImages] = useState(product.images.map(image => ({ url: image })));
  const [selectedColors, setSelectedColors] = useState(product.colors.map(color => ({ url: color })));
  const [selectedCategory, setSelectedCategory] = useState(product.category);
  const [accordingTypes, setAccordingTypes] = useState([]);

  const setToastDisplay = useSetRecoilState(toastDisplayState);
  const setProductEditDisplay = useSetRecoilState(productEditDisplayState);

  useEffect(() => {
    const newTypes = types.filter(type => type.categoryName === selectedCategory);
    setAccordingTypes(newTypes);
  }, [selectedCategory]);

  const resetSelections = () => {
    setSelectedImages([]);
    setSelectedColors([]);
    setSelectedCategory('');
    setAccordingTypes([]);
  }

  const mutation = useMutation(async ({ values }) => {
    const completeImages = selectedImages.filter(image => !image.file);
    const completeColors = selectedColors.filter(color => !color.file);

    const images = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      if (selectedImages[i].file) {
        images.append('images', selectedImages[i].file);
      }
    }

    const colors = new FormData();
    for (let i = 0; i < selectedColors.length; i++) {
      if (selectedColors[i].file) {
        colors.append('images', selectedColors[i].file);
      }
    }

    const [uploadedImages, uploadedColors] = await Promise.all([
      productApi.uploadImages(images),
      productApi.uploadImages(colors)
    ]);

    // uploadedImages.concat(completeImages.map(image => image.url));
    // uploadedColors.concat(completeColors.map(color => color.url));

    // console.log(uploadedImages)
    // console.log(uploadedColors)

    let productStatus = values.productStatus.map(status => parseInt(status));
    if (values.productDiscount > 0 && !productStatus.includes(2)) {
      productStatus.push(2);
    }
    if (parseInt(values.productDiscount) <= 0) {
      productStatus = productStatus.filter(status => status !== 2);
    }
    if (productStatus.length >= 2 && productStatus.includes(0)) {
      productStatus = productStatus.filter(status => status !== 0);
    }
    if (!productStatus.length) {
      productStatus.push(0);
    }

    const data = {
      name: values.productName,
      category: values.productCategory,
      type: values.productType,
      price: values.productPrice,
      discount: values.productDiscount,
      quantity: values.productQuantity,
      sizes: values.productSize,
      status: productStatus,
      images: completeImages.map(image => image.url).concat(uploadedImages.images),
      colors: completeColors.map(image => image.url).concat(uploadedColors.images)
    }

    console.log(data);

    productApi.update(product._id, data).then(response => {
      console.log('Luu thanh cong');
      console.log(response);

      refetch();

      setToastDisplay({
        show: true,
        message: 'Sản phẩm đã được cập nhật'
      });
    }).catch(error => console.log(error));
  });

  const defaultValues = {
    productName: product.name,
    productPrice: product.real_price,
    productCategory: product.category,
    productType: product.type,
    productQuantity: product.quantity,
    productStatus: product.status.map(status => status.toString()),
    productSize: product.sizes,
    productDiscount: product.discount,
    productImages: product.images,
    productColors: product.colors
  };

  const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    console.log(values);
    mutation.mutate({ values });
  }

  const handleCategoryChange = (e) => {
    const category = e.target.selectedOptions[0].value;
    setSelectedCategory(category);
    setValue('productType', '');
  };

  const handleClosing = () => {
    setProductEditDisplay(false);
    reset();
    resetSelections();
  }

  const handleImagesChoose = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => ({
        file: file,
        url: URL.createObjectURL(file)
      }));
      const expectedImages = [...selectedImages].concat(fileArray);

      if (expectedImages.length > 5) {
        setToastDisplay({
          show: true,
          message: 'Chỉ chọn tối đa 5 ảnh'
        });
      } else {
        setSelectedImages(expectedImages);
        setValue('productImages', expectedImages);
        clearErrors('productImages');
      }

      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
      e.target.value = null;
    }
  }

  const handleColorsChoose = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => ({
        file: file,
        url: URL.createObjectURL(file)
      }));
      const expectedColors = [...selectedColors].concat(fileArray);

      if (expectedColors.length > 5) {
        setToastDisplay({
          show: true,
          message: 'Chỉ chọn tối đa 5 ảnh'
        });
      } else {
        setSelectedColors(expectedColors);
        setValue('productColors', expectedColors);
        clearErrors('productColors');
      }

      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
      e.target.value = null;
    }
  }

  const handleRemoveImageClick = (image) => {
    const expectedImages = selectedImages.filter(img => img !== image);
    setSelectedImages(expectedImages);
    setValue('productImages', expectedImages);
    if (!expectedImages.length) {
      setError('productImages', { message: 'Chọn ít nhất 1 ảnh' });
    }
  }

  const handleRemoveColorClick = (color) => {
    const expectedColors = selectedColors.filter(img => img !== color);
    setSelectedColors(expectedColors);
    setValue('productColors', expectedColors);
    if (!expectedColors.length) {
      setError('productColors', { message: 'Chọn ít nhất 1 ảnh' });
    }
  }

  return (
    <div className="edit-product">
      <div id="overlay"></div>
      <div className="edit-product-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container"
        >
          <div className="form-control">
            <label htmlFor="productName">Tên sản phẩm</label>
            <div className="input-container">
              <input {...register("productName")} type="text" name="productName" />
              <TextError>{errors.productName?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="productCategory">Phân loại</label>
            <div className="input-container">
              <select {...register("productCategory")} name="productCategory" onChange={(e) => handleCategoryChange(e)}>
                <option hidden value="">-- Phân loại --</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))}
              </select>
              <TextError>{errors.productCategory?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="productType">Loại</label>
            <div className="input-container">
              <select {...register("productType")} name="productType">
                {accordingTypes.map(type => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
              <TextError>{errors.productType?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="productPrice">Giá</label>
            <div className="input-container">
              <div className="price-input">
                <input {...register("productPrice")} type="number" step="1000" name="productPrice" />
                <label className="unit-lb">VND</label>
              </div>
              <TextError>{errors.productPrice?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="productDiscount">Khuyến mãi</label>
            <div className="input-container">
              <div className="price-input">
                <input {...register("productDiscount")} type="number" step="1000" name="productDiscount" />
                <label className="unit-lb">VND</label>
              </div>
              <TextError>{errors.productDiscount?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="productQuantity">Số lượng</label>
            <div className="input-container">
              <input {...register("productQuantity")} type="number" name="productQuantity" />
              <TextError>{errors.productQuantity?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="status-options">Trạng thái</label>
            <div className="multi-select-container">
              <div className="status-options">
                <input {...register("productStatus")} name="productStatus" type="checkbox" id="new" value="1" />
                <label htmlFor="new">Mới nhất</label>
                <input {...register("productStatus")} name="productStatus" type="checkbox" id="hot" value="3" />
                <label htmlFor="hot">Bán chạy</label>
              </div>
              <TextError>{errors.productStatus?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="size-options">Kích thước</label>
            <div className="multi-select-container">
              <div className="size-options">
                {sizes.map(size => (
                  <React.Fragment key={size}>
                    <input {...register("productSize")} name="productSize" type="checkbox" id={size} value={size} />
                    <label htmlFor={size}>{size}</label>
                  </React.Fragment>
                ))}
              </div>
              <TextError>{errors.productSize?.message}</TextError>
            </div>
          </div>

          <div className="image-control">
            <label className="label-for-img" htmlFor="product-image">Hình ảnh</label>
            <input name="productImages" type="file" multiple id="image" onChange={(e) => handleImagesChoose(e)} accept="image/*" />
            <div className="product-image">
              <div className="img-row">
                {selectedImages.map(image => (
                  <div className="img-col" key={image.url}>
                    <div className="image-color" style={{ backgroundImage: `url(${image.url})` }}>
                      <span className="remove-image-btn" onClick={() => handleRemoveImageClick(image)}>
                        <IoIosClose className="remove-image-icon" />
                      </span>
                    </div>
                  </div>
                ))}
                {selectedImages.length < 5 && (
                  <div className="img-col">
                    <label htmlFor="image" className="image-upload">+</label>
                  </div>
                )}
              </div>
              <TextError>{errors.productImages?.message}</TextError>
            </div>
          </div>

          <div className="image-control">
            <label className="label-for-img" htmlFor="product-color">Màu sắc</label>
            <input name="productColors" type="file" multiple id="color" onChange={(e) => handleColorsChoose(e)} accept="image/*" />
            <div className="product-color">
              <div className="img-row">
                {selectedColors.map(color => (
                  <div className="img-col" key={color.url}>
                    <div className="image-color" style={{ backgroundImage: `url(${color.url})` }}>
                      <span className="remove-image-btn" onClick={() => handleRemoveColorClick(color)}>
                        <IoIosClose className="remove-image-icon" />
                      </span>
                    </div>
                  </div>
                ))}
                {selectedColors.length < 5 && (
                  <div className="img-col">
                    <label htmlFor="color" className="image-upload">+</label>
                  </div>
                )}
              </div>
              <TextError>{errors.productColors?.message}</TextError>
            </div>
          </div>

          <div className="btn-group">
            <button type="button" className="cancel-btn" onClick={handleClosing}>Hủy</button>
            <button type="submit" className="save-product-btn">Lưu</button>
          </div>
        </form>

        {mutation.isLoading && <div className="loading-overlay">
          <LoopCircleLoading color='#ff7eae' />
        </div>}
      </div>
    </div>
  );
}

export default EditProduct;