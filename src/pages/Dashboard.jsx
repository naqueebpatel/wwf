import { FcSalesPerformance } from 'react-icons/fc';
import { FaPeopleArrows } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Data, PieData } from '../components/SlidebarData';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import '../styles/dashboard.css';
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const Dashboard = ({ setCollapsed }) => {
    function getCurrentDimension() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    const [screenSize, setScreenSize] = useState(getCurrentDimension());
    useEffect(() => {
        setCollapsed(true);
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        });
    }, [screenSize]);
    return (
        <>
            <main className="main-container">
                <div className="main-title">
                    <h3>Dashboard</h3>
                </div>

                <section class="py-3 py-md-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12 col-lg-10 col-xl-8 col-xxl-7">
                                <div class="row gy-4">
                                    <div class="col-12 col-sm-4">
                                        <div class="card widget-card border-light shadow-sm">
                                            <div class="card-body p-4">
                                                <div class="row">
                                                    <div class="col-8">
                                                        <h5 class="card-title widget-card-title mb-3">Sales</h5>
                                                        <h4 class="card-subtitle text-body-secondary m-0">$6,820</h4>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="d-flex justify-content-end">
                                                            <div class="lh-1 text-white bg-info rounded-circle p-3 d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-truck fs-4"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="d-flex align-items-center mt-3">
                                                            <span class="lh-1 me-3 bg-danger-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-arrow-right-short bsb-rotate-45"></i>
                                                            </span>
                                                            <div>
                                                                <p class="fs-7 mb-0">-9%</p>
                                                                <p class="fs-7 mb-0 text-secondary">since last week</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-4">
                                        <div class="card widget-card border-light shadow-sm">
                                            <div class="card-body p-4">
                                                <div class="row">
                                                    <div class="col-8">
                                                        <h5 class="card-title widget-card-title mb-3">Earnings</h5>
                                                        <h4 class="card-subtitle text-body-secondary m-0">$21,900</h4>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="d-flex justify-content-end">
                                                            <div class="lh-1 text-white bg-info rounded-circle p-3 d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-currency-dollar fs-4"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="d-flex align-items-center mt-3">
                                                            <span class="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-arrow-right-short bsb-rotate-n45"></i>
                                                            </span>
                                                            <div>
                                                                <p class="fs-7 mb-0">+26%</p>
                                                                <p class="fs-7 mb-0 text-secondary">since last week</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-4">
                                        <div class="card widget-card border-light shadow-sm">
                                            <div class="card-body p-4">
                                                <div class="row">
                                                    <div class="col-8">
                                                        <h5 class="card-title widget-card-title mb-3">Visitors</h5>
                                                        <h4 class="card-subtitle text-body-secondary m-0">3,764</h4>
                                                    </div>
                                                    <div class="col-4">
                                                        <div class="d-flex justify-content-end">
                                                            <div class="lh-1 text-white bg-info rounded-circle p-3 d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-person fs-4"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="d-flex align-items-center mt-3">
                                                            <span class="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                                                <i class="bi bi-arrow-right-short bsb-rotate-n45"></i>
                                                            </span>
                                                            <div>
                                                                <p class="fs-7 mb-0">+69%</p>
                                                                <p class="fs-7 mb-0 text-secondary">since last week</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section class="py-3 py-md-5">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12 col-lg-9 col-xl-8">
                                <div class="card widget-card border-light shadow-sm">
                                    <div class="card-body p-4">
                                        <div class="d-block d-sm-flex align-items-center justify-content-between mb-3">
                                            <div class="mb-3 mb-sm-0">
                                                <h5 class="card-title widget-card-title">Sales Overview</h5>
                                            </div>
                                            <div>
                                                <select class="form-select text-secondary border-light-subtle">
                                                    <option value="1">March 2023</option>
                                                    <option value="2">April 2023</option>
                                                    <option value="3">May 2023</option>
                                                    <option value="4">June 2023</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="bsb-chart-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="charts">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={600}
                            height={300}
                            data={Data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={PieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {PieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </main>
        </>
    );
};
export default Dashboard;