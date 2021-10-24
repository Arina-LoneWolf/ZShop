import './Statistics.scss';
import React from 'react';
import { useQuery } from 'react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
import { EatLoading } from 'react-loadingg';
import orderApi from '../../../apis/orderApi';

function Statistics() {
  const { data, isLoading } = useQuery('statistics', async () => {
    let [categorySales, categorySold, monthlySales, monthlySold] = await Promise.all([
      orderApi.getCategorySales(),
      orderApi.getCategorySold(),
      orderApi.getMonthlySales(),
      orderApi.getMonthlySold()
    ]);

    // console.log(categorySales.result, categorySold.result, monthlySales.data, monthlySold.data);

    categorySales = categorySales.result;
    categorySold = categorySold.result;
    monthlySales = monthlySales.data.map(datum => ({ 'Tháng': datum.month, 'Doanh thu': datum.total }));
    monthlySold = monthlySold.data.map(datum => ({
      'Tháng': datum.Month,
      'Áo': datum.Ao,
      'Quần': datum.Quan,
      'Đầm váy': datum.DamVay
    }));

    return {
      categorySales,
      categorySold,
      monthlySales,
      monthlySold
    }
  });

  return (
    <React.Fragment>
      {isLoading && <EatLoading color="#ff7eae" />}
      {data && <div className="statistics">
        <div className="chart-zone">
          <div className="monthly-sales">
            <ResponsiveContainer>
              <AreaChart
                data={data.monthlySales}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 30
                }}
              >
                <defs>
                  <linearGradient id="monthlySalesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Tháng" />
                <YAxis width={80} />
                <Tooltip />
                <Area type="monotone" dataKey="Doanh thu" stroke="#8884d8" fill="url(#monthlySalesColor)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="chart-name">Biểu đồ doanh thu hàng tháng</div>
          </div>

          <div className="sold-category-monthly">
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={data.monthlySold}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 40,
                }}
              >
                <XAxis dataKey="Tháng" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Áo" fill="#8884d8" />
                <Bar dataKey="Quần" fill="#ffc355" />
                <Bar dataKey="Đầm váy" fill="#ff7eae" />
              </BarChart>
            </ResponsiveContainer>
            <div className="chart-name">Biểu đồ số lượng bán hàng tháng</div>
          </div>
        </div>

        <div className="overview">
          <div className="category-overview shirt">
            <div className="category-name">Áo</div>
            <div className="total-control">
              <div className="total-title">Tổng doanh thu</div>
              <div className="total-value">{data.categorySales[0].total.toLocaleString()}đ</div>
            </div>
            <div className="total-control">
              <div className="total-title">Tổng số lượng bán</div>
              <div className="total-value">{data.categorySold[0].total.toLocaleString()}</div>
            </div>
          </div>

          <div className="category-overview pants">
            <div className="category-name">Quần</div>
            <div className="total-control">
              <div className="total-title">Tổng doanh thu</div>
              <div className="total-value">{data.categorySales[1].total.toLocaleString()}đ</div>
            </div>
            <div className="total-control">
              <div className="total-title">Tổng số lượng bán</div>
              <div className="total-value">{data.categorySold[1].total.toLocaleString()}</div>
            </div>
          </div>

          <div className="category-overview dress-skirt">
            <div className="category-name">Đầm váy</div>
            <div className="total-control">
              <div className="total-title">Tổng doanh thu</div>
              <div className="total-value">{data.categorySales[2].total.toLocaleString()}đ</div>
            </div>
            <div className="total-control">
              <div className="total-title">Tổng số lượng bán</div>
              <div className="total-value">{data.categorySold[2].total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default Statistics;