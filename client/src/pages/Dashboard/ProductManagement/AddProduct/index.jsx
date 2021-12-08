import './AddProduct.scss';
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastDisplayState } from '../../../../recoil/toastDisplayState';
import { productAddDisplayState } from '../../../../recoil/productAddDisplayState';
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
import imageUploadApi from '../../../../apis/imageUploadApi';

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

function AddNewProduct({ refetch }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [accordingTypes, setAccordingTypes] = useState([]);

  const setToastDisplay = useSetRecoilState(toastDisplayState);
  const setProductAddDisplay = useSetRecoilState(productAddDisplayState);

  const resetSelections = () => {
    setSelectedImages([]);
    setSelectedColors([]);
    setSelectedCategory('');
    setAccordingTypes([]);
  }

  const mutation = useMutation(async ({ values }) => {
    const images = new FormData();
    for (let i = 0; i < selectedImages.length; i++) {
      images.append('images', selectedImages[i].file);
    }

    const colors = new FormData();
    for (let i = 0; i < selectedColors.length; i++) {
      colors.append('images', selectedColors[i].file);
    }

    const [uploadedImages, uploadedColors] = await Promise.all([
      imageUploadApi.uploadImages(images),
      imageUploadApi.uploadImages(colors)
    ]);

    // console.log(uploadedImages)
    // console.log(uploadedColors)

    const productStatus = values.productStatus;

    if (values.productDiscount > 0) {
      productStatus.push('Khuyến mãi');
    } else if (!values.productStatus.length) {
      productStatus.push('Không có');
    }

    const product = {
      name: values.productName,
      category: values.productCategory,
      type: values.productType,
      price: values.productPrice,
      discount: values.productDiscount,
      quantity: values.productQuantity,
      sizes: values.productSize,
      status: productStatus,
      images: uploadedImages.images,
      colors: uploadedColors.images
    }

    console.log(product);

    productApi.add(product).then(response => {
      console.log('Them thanh cong');
      console.log(response);

      reset();
      resetSelections();
      refetch();

      setToastDisplay({
        show: true,
        message: 'Thêm sản phẩm thành công'
      });
    }).catch(error => console.log(error));
  });

  const defaultValues = {
    productStatus: [],
    productSize: [],
    productImages: [],
    productColors: []
  }

  const { register, handleSubmit, setValue, setError, clearErrors,  reset, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (values) => {
    // console.log(values);
    mutation.mutate({ values });
  }

  useEffect(() => {
    const newTypes = types.filter(type => type.categoryName === selectedCategory);
    setAccordingTypes(newTypes);
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const category = e.target.selectedOptions[0].value;
    setSelectedCategory(category);
    setValue('productType', '');
  };

  const handleClosing = () => {
    setProductAddDisplay(false);
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
    <div className="add-new-product-zone">
      <div id="overlay"></div>
      <div className="add-new-product-container">
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
                <option hidden value="">----- Loại ----</option>
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
                <input {...register("productPrice")} type="number" name="productPrice" />
                <label className="unit-lb">VND</label>
              </div>
              <TextError>{errors.productPrice?.message}</TextError>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="productDiscount">Khuyến mãi</label>
            <div className="input-container">
              <div className="price-input">
                <input {...register("productDiscount")} type="number" name="productDiscount" />
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
                <input {...register("productStatus")} name="productStatus" type="checkbox" id="new" value="Mới" />
                <label htmlFor="new">Mới nhất</label>
                <input {...register("productStatus")} name="productStatus" type="checkbox" id="hot" value="Bán chạy" />
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
            <button type="button" className="cancel-btn" onClick={handleClosing}>Đóng</button>
            <button type="submit" className="add-product-btn">Thêm</button>
          </div>
        </form>

        {mutation.isLoading && <div className="loading-overlay">
          <LoopCircleLoading color='#ff7eae' />
        </div>}
      </div>
    </div>
  );
}

export default AddNewProduct;