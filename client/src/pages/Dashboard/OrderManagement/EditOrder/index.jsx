import './EditOrder.scss';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { orderEditDisplayState } from '../../../../recoil/orderEditDisplayState';
import { toastDisplayState } from '../../../../recoil/toastDisplayState';
import { dialogState } from '../../../../recoil/dialogState';
import Stepper from './Stepper';
import { useMutation } from 'react-query';
import { IoClose } from "react-icons/io5";
import orderApi from '../../../../apis/orderApi';

const steps = [
  {
    stepNumber: 0,
    description: 'Chờ xác nhận'
  },
  {
    stepNumber: 1,
    description: 'Đã xác nhận'
  },
  {
    stepNumber: 2,
    description: 'Đã thanh toán'
  },
  {
    stepNumber: 3,
    description: 'Thành công'
  }
];

function EditOrder({ order, refetch }) {
  const setDialog = useSetRecoilState(dialogState);
  const setOrderEditDisplay = useSetRecoilState(orderEditDisplayState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const [currentStep, setCurrentStep] = useState(order.status);

  const mutation = useMutation(async () => {
    const data = {
      id: order.orderId,
      status: currentStep
    }

    orderApi.update(data).then(response => {
      console.log('Luu thanh cong');
      console.log(response.data);
      refetch();
      setToastDisplay({
        show: true,
        message: 'Đã lưu cập nhật'
      });
    }).catch(error => console.log(error));
  })

  const handleCancelOrder = () => {
    setDialog({
      show: true,
      message: 'Bạn xác nhận muốn hủy đơn hàng?',
      acceptButtonName: 'Xác nhận',
      adminMode: true,
      func: () => {
        const data = {
          id: order.orderId,
          status: 4
        }

        orderApi.update(data).then(response => {
          console.log('Luu thanh cong');
          console.log(response);
          refetch();
          setToastDisplay({
            show: true,
            message: 'Đã hủy đơn hàng'
          });
          setOrderEditDisplay(false);
        }).catch(error => console.log(error));
      }
    });
  }

  const handlePrevStepClick = () => {
    if (currentStep <= 0) return;
    setCurrentStep(step => step - 1);
  }

  const handleNextStepClick = () => {
    if (currentStep >= steps.length - 1) return;
    setCurrentStep(step => step + 1);
  }

  const handleClosing = () => {
    setOrderEditDisplay(false);
  }

  const handleSaveOrderStatus = () => {
    mutation.mutate();
  }

  return (
    <div className="edit-order">
      <div id="overlay"></div>
      <div className="edit-order-container">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="btn-group">
          <div className="cancel-order-btn" onClick={handleCancelOrder}>Hủy đơn hàng</div>
          <div className="prev-step-btn" onClick={handlePrevStepClick}>Về trạng thái trước</div>
          <div className="next-step-btn" onClick={handleNextStepClick}>Trạng thái kế tiếp</div>
          <div className="save-btn" onClick={handleSaveOrderStatus}>Lưu</div>
        </div>

        <div className="close-btn" onClick={handleClosing}>
          <IoClose className="close-icon" />
        </div>
      </div>
    </div>
  );
}

export default EditOrder;