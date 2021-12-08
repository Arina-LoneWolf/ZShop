import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderDisplayState } from '../../../recoil/orderDisplayState';
import { userState } from '../../../recoil/userState';
import OrderDetail from '../../../shared/OrderDetail';
import { useQuery } from 'react-query';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import orderApi from '../../../apis/orderApi';

function OrderHistory() {
  const [orderDisplay, setOrderDisplay] = useRecoilState(orderDisplayState);

  const [currentOrder, setCurrentOrder] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  const user = useRecoilValue(userState);

  const { data: orders, isLoading } = useQuery(['userOrders', page], async () => {
    const params = {
      page: page + 1,
      limit: 8
    }
    const response = await orderApi.getByUserId(user.id, params);
    setTotalPages(response.totalPages);
    return response.orders;
  });

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  const handleViewDetailClick = (order) => {
    setCurrentOrder(order);
    setOrderDisplay(true);
  }

  return (
    <React.Fragment>
      <div className="info-title">Lịch sử mua hàng</div>
      <div className="divider"></div>

      <table className="order-history" width="100%">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày</th>
            <th>Tổng đơn</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders?.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{new Date(order.orderDate).toLocaleString("en-GB").slice(0, 10)}</td>
              <td>{order.total.toLocaleString()}đ</td>
              <td>{getStatus(order.status)}</td>
              <td><span className="view-detail-btn" onClick={() => handleViewDetailClick(order)}>Xem chi tiết</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders?.length > 0 && totalPages > 1 &&
        <ReactPaginate
          previousLabel={<GrFormPrevious className="prev-icon" />}
          nextLabel={<GrFormNext className="next-icon" />}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"paginated-btn"}
          breakClassName={"paginated-btn"}
          previousClassName={"prev-btn"}
          nextClassName={"next-btn"}
          disabledClassName={"disabled-btn"}
          activeClassName={"active-btn"}
          forcePage={page}
        />}

      {orderDisplay && <OrderDetail order={currentOrder} />}
    </React.Fragment>
  );
}

const getStatus = (status) => {
  switch (status) {
    case 0: return 'Chờ xác nhận';
    case 1: return 'Đã xác nhận';
    case 2: return 'Đã thanh toán';
    case 3: return 'Giao thành công';
    case 4: return 'Đã hủy';
    default: return null;
  }
}

export default OrderHistory;