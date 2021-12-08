import './Statistics.scss';
import React, { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import { EatLoading } from 'react-loadingg';
import orderApi from '../../../apis/orderApi';
import categories from '../../../shared/data/categories';

function Statistics() {
  const categoryOptionRef = useRef(null);
  const salesMonthOptionRef = useRef(null);
  const soldMonthOptionRef = useRef(null);

  const [category, setCategory] = useState('Áo');
  const [salesMonth, setSalesMonth] = useState(12);
  const [soldMonth, setSoldMonth] = useState(12);

  const { data, isLoading } = useQuery(['statistics', category, salesMonth, soldMonth], async () => {
    let [monthlySales, monthlyCategorySales, categorySales, categorySold] = await Promise.all([
      orderApi.getMonthlySales(),
      orderApi.getMonthlySaleByCategory(category),
      orderApi.getCategorySalesByMonth(salesMonth),
      orderApi.getCategorySoldByMonth(soldMonth)
    ]);

    // console.log(monthlySales.data, monthlyCategorySales.data, categorySales.data, categorySold.data);

    monthlySales = monthlySales.data.map(datum => ({ 'Tháng': datum.month, 'Doanh thu': datum.total }));
    monthlyCategorySales = monthlyCategorySales.data.map(datum => ({ 'Tháng': datum.month, 'Doanh thu': datum.total }));

    console.log('log ra thu', categorySold.data)

    return {
      monthlySales,
      monthlyCategorySales,
      categorySales: categorySales.data,
      categorySold: categorySold.data,
      totalCategorySales: categorySales.total,
      totalCategorySold: categorySold.total
    }
  });

  const handleCategoryChange = () => {
    setCategory(categoryOptionRef.current.value);
  }

  const handleSalesMonthChange = () => {
    setSalesMonth(salesMonthOptionRef.current.value);
  }

  const handleSoldMonthChange = () => {
    setSoldMonth(soldMonthOptionRef.current.value);
  }

  const COLORS = ["#3369e7", "#8e43e7", "#ff4f81", "#ff6c5f", "#ffc168", "#2dde98", "#1cc7d0", "#00aeff"];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // const sample = [
  //   {
  //     "category": "Áo",
  //     "month": 12,
  //     "total": 810000
  //   },
  //   {
  //     "category": "Đầm váy",
  //     "month": "12",
  //     "total": 120000
  //   },
  //   {
  //     "category": "Đồ trang trí",
  //     "month": "12",
  //     "total": 100000
  //   },
  //   {
  //     "category": "Gấu bông",
  //     "month": "12",
  //     "total": 172000
  //   },
  //   {
  //     "category": "Quà tặng",
  //     "month": "12",
  //     "total": 500000
  //   },
  //   {
  //     "category": "Quần",
  //     "month": "12",
  //     "total": 90000
  //   },
  //   {
  //     "category": "Túi ví",
  //     "month": "12",
  //     "total": 420000
  //   }
  // ]

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
            <div className="chart-name">Tổng doanh thu qua các tháng</div>
          </div>

          <div className="monthly-category-sales">
            <ResponsiveContainer>
              <AreaChart
                data={data.monthlyCategorySales}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 30
                }}
              >
                <defs>
                  <linearGradient id="monthlyCategorySalesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFA388" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFA388" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Tháng" />
                <YAxis width={80} />
                <Tooltip />
                <Area type="monotone" dataKey="Doanh thu" stroke="#FFA388" fill="url(#monthlyCategorySalesColor)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="chart-name">
              <span className="chart-name-title">Tổng doanh thu qua các tháng của</span>
              <select name="category-options" ref={categoryOptionRef} onChange={handleCategoryChange}>
                {categories.map(category => (
                  <option value={category.name} key={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overview">
          <div className="category-overview">
            <PieChart width={160} height={160}>
              <Pie
                data={data?.categorySales}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="total"
              >
                {data?.categorySales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>

            <div className="chart-annotations">
              {categories.map((category, index) => (
                <div className="annotations-wrapper" key={category.name}>
                  <span className="color-sign" style={{ background: COLORS[index % COLORS.length] }} />
                  <span className="color-annotation">{category.name}</span>
                </div>
              ))}
            </div>

            <div className="chart-name">
              <span className="chart-name-title">Tổng doanh thu tháng</span>
              <select name="category-options" ref={salesMonthOptionRef} onChange={handleSalesMonthChange}>
                {months.map((month) => (
                  <option value={month} key={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="total">{data?.totalCategorySales?.toLocaleString()}đ</div>
          </div>

          <div className="category-overview">
            <PieChart width={160} height={160}>
              <Pie
                data={data?.categorySold}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="total"
              >
                {data?.categorySold.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>

            <div className="chart-annotations">
              {categories.map((category, index) => (
                <div className="annotations-wrapper" key={category.name}>
                  <span className="color-sign" style={{ background: COLORS[index % COLORS.length] }} />
                  <span className="color-annotation">{category.name}</span>
                </div>
              ))}
            </div>

            <div className="chart-name">
              <span className="chart-name-title">Tổng số lượng bán tháng</span>
              <select name="category-options" ref={soldMonthOptionRef} onChange={handleSoldMonthChange}>
                {months.map((month) => (
                  <option value={month} key={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="total">{data?.totalCategorySold}</div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default Statistics;