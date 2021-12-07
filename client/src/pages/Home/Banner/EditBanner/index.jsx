import './EditBanner.scss';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { bannerManagerDisplayState } from '../../../../recoil/bannerManagerDisplayState';
import { dialogState } from '../../../../recoil/dialogState';
import { LoopCircleLoading } from 'react-loadingg';
import { useMutation } from 'react-query';
import { IoClose } from "react-icons/io5";
import imageUploadApi from '../../../../apis/imageUploadApi';
import bannerApi from '../../../../apis/bannerApi';

function EditBanner({ banners, refetch}) {
  const setBannerManagerDisplay = useSetRecoilState(bannerManagerDisplayState);
  const setDialog = useSetRecoilState(dialogState);

  const handleClosing = () => {
    setBannerManagerDisplay(false);
  }

  const addBannerMutation = useMutation(async ({ data: { bannerImage } }) => {
    const bannerImg = new FormData();
    bannerImg.append('images', bannerImage);
    const bannerLink = await imageUploadApi.uploadImages(bannerImg);

    const newBanners = {
      bannerLink: bannerLink.images[0]
    }

    bannerApi.add(newBanners)
      .then(response => {
        console.log(response);
        refetch();
      })
      .catch(error => console.log(error));
  });

  const addBanner = (e) => {
    const data = {
      bannerImage: e.target.files[0]
    }

    addBannerMutation.mutate({ data });
  }

  const changeBannerMutation = useMutation(async ({ data: { bannerImage, bannerId } }) => {
    const bannerImg = new FormData();
    bannerImg.append('images', bannerImage);
    const bannerLink = await imageUploadApi.uploadImages(bannerImg);

    const newBanners = {
      id: bannerId,
      bannerLink: bannerLink.images[0]
    }
    console.log(newBanners);
    bannerApi.update(newBanners)
      .then(response => {
        console.log(response);
        refetch();
      })
      .catch(error => console.log(error));
  });

  const changeBanner = (e, bannerId) => {
    const data = {
      bannerImage: e.target.files[0],
      bannerId
    }

    changeBannerMutation.mutate({ data });
  }

  const deleteBanner = (bannerId) => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa banner?',
      acceptButtonName: 'Xóa',
      func: () => {
        bannerApi.delete(bannerId)
          .then((response) => {
            console.log(response);
            refetch();
          })
          .catch(error => console.log(error));
      }
    })
  }

  return (
    <React.Fragment>
      <div id="overlay" />
      <form className="edit-banner">
        <h1>Quản lý banner</h1>

        <div className="banner-list-table">
          <div className="table-heading">
            <div className="stt-heading fl-12">STT</div>
            <div className="image-heading fl-55">Hình ảnh</div>
            <div className="add-new-container fl-33">
              <input type="file" id="new-banner-img" onChange={addBanner} accept="image/*" />
              {banners?.length < 5 && <label htmlFor="new-banner-img" className="add-new-btn">+ Thêm</label>}
            </div>
          </div>

          <div className="table-body">
            {banners?.map((banner, index) => (
              <div className="banner-item">
                <div className="banner-stt fl-12">{index + 1}</div>
                <div className="banner-image-container fl-55">
                  <div className="banner-image" style={{ backgroundImage: `url(${banner.bannerLink})` }} />
                </div>
                <div className="banner-manipulation fl-33">
                  <input type="file" id={'image-change-' + index} onChange={(e) => changeBanner(e, banner.id)} accept="image/*" />
                  <label htmlFor={'image-change-' + index} className="update-btn">Thay đổi</label>
                  <label className="delete-btn" onClick={() => deleteBanner(banner.id)}>Xóa</label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="close-btn" onClick={handleClosing}>
          <IoClose className="close-icon" />
        </div>
      </form>
    </React.Fragment>
  );
}

export default EditBanner;