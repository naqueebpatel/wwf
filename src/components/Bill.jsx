import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bill = ({ setCollapsed }) => {
    const [state, setState] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setCollapsed(true);
        const date = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setCurrentMonth(monthNames[date.getMonth()]);
    }, [setCollapsed]);

    const handleLogin = () => {
        if (id === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
        } else {
            Swal.fire('Error', 'Invalid ID or Password', 'error');
        }
    };

    const handleMonth = async () => {
        try {
            const response = await axios.post('http://localhost:8090/waterwork/add/monthlyBillDebit');
            if (response.status === 200) {
                Swal.fire('Success', `Bill for ${currentMonth} generated successfully`, 'success');
                setState(false);
            } else {
                Swal.fire('Error', 'Failed to generate bill', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to generate bill', 'error');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {!isAuthenticated ? (
                <div className="card p-4 shadow-lg" style={{ width: '300px' }}>
                    <h3 className="text-center mb-4">Login</h3>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID:</label>
                        <input
                            type="text"
                            id="id"
                            className="form-control"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleLogin} className="btn btn-primary w-100">Login</button>
                </div>
            ) : (
                <div className="card text-center p-4 shadow-lg" style={{ maxWidth: '400px' }}>
                    <h3 className="card-title">Generate Bill</h3>
                    <div className="card-body">
                        <p className="card-text">
                            Click the button below to generate the bill for the current month ({currentMonth}).
                            This will include all transactions and <span style={{color:"red"}}>Rs 300 will be deducted from every Active account</span>
                        </p>
                        <button className="btn btn-success mt-3" disabled={state} onClick={handleMonth}>
                            <i className="bi bi-receipt"></i> Generate Bill for {currentMonth}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bill;

