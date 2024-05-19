import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { MDBBadge } from "mdb-react-ui-kit";
import { FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import signature from "../Reports/signature.png"
import Button from "react-bootstrap/esm/Button";
import LoaderComp from "../LoaderComp";

function formatDateWithoutTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const ExpenseReports = ({ setCollapsed }) => {
    const [outwardData, setOutwardData] = useState([]);
    const [outwardTrans, setOutwardTrans] = useState([]);
    const [filterOutward, setFilterOutward] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState({
        startDate: "",
        endDate: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCollapsed(true);
        fetchOutwardTransData();
        fetchOutwardData();
    }, []);

    const fetchOutwardData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8090/waterwork/get/getAllOutwardSource"
            );
            setOutwardData(response.data); // Assuming data is an array of objects with zonename and zoneno attributes
        } catch (error) {
            console.error("Error fetching zone data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOutwardTransData = async () => {
        try {
            setLoading(true);
            Swal.isLoading();
            const response = await axios.get(
                "http://localhost:8090/waterwork/get/getAllOutwardTrans"
            );
            console.log(response.data);
            setOutwardTrans(response.data);
            setFilterOutward(response.data); // Set filteredOutwardTrans initially with all data
            Swal.hideLoading();
        } catch (error) {
            console.error("Error fetching outwardTrans data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const { value } = event.target;

        switch (selectedFilter) {
            case "By Tid":
                handleFilterTid(value);
                break;
            case "By Sid":
                handleFilterSid(value);
                break;
            case "By Paid To":
                handlePaidTo(value);
                break;
            case "By Receipt No.":
                handleFilterReceipt(value);
                break;
            default:
                break;
        }
    };

    const handleFilterChange = (filter) => {
        console.log(filter);
        setSelectedFilter(filter);

        switch (filter) {
            case "HIGH to LOW":
                handleSortHighToLow();
                break;
            case "LOW to HIGH":
                handleSortLowToHigh();
                break;
            case "Date":
                handleFilterDate();
                break;
            default:
                break;
        }
    };

    const filterOptions = ["By Tid", "By Source", "By Receipt No.", "By Paid To"];

    const handleDateEvent = (event) => {
        setDate({
            ...date,
            [event.target.name]: event.target.value,
        });
    };

    const handleFilterTid = (value) => {
        const filteredData = outwardTrans.filter((outwardTrans) => {
            const tid = String(outwardTrans.outwardTid);
            return tid.includes(value);
        });
        setFilterOutward(filteredData);
    };

    const handleFilterSid = (value) => {
        const filteredData = outwardTrans.filter((outwardTrans) => {
            const sid = String(outwardTrans.outwardSname);
            return sid.includes(value);
        });
        setFilterOutward(filteredData);
    };

    const handlePaidTo = (value) => {
        const filteredData = outwardTrans.filter((outward) => {
            const paid = outward.paidto.toLowerCase();
            return paid.includes(value.toLowerCase());
        });
        console.log(filteredData);
        setFilterOutward(filteredData);
    };

    const handleFilterReceipt = (value) => {
        const filteredData = outwardTrans.filter((outward) => {
            const receiptNo = String(outward.voucherno);
            return receiptNo.includes(value);
        });
        setFilterOutward(filteredData);
    };

    const handleFilterDate = () => {
        const startDate = new Date(date.startDate);
        const endDate = new Date(date.endDate);

        const filteredData = outwardTrans.filter((outwardTrans) => {
            const transactionDate = new Date(outwardTrans.outtdate);
            return transactionDate >= startDate && transactionDate <= endDate;
        });

        setFilterOutward(filteredData);
    };

    const handleSortHighToLow = () => {
        const sortedData = [...filterOutward].sort(
            (a, b) => b.outamount - a.outamount
        );
        setFilterOutward(sortedData);
    };

    const handleSortLowToHigh = () => {
        const sortedData = [...filterOutward].sort(
            (a, b) => a.outamount - b.outamount
        );
        setFilterOutward(sortedData);
    };

    if (loading) {
        return (
            <div>
                <div
                    style={{
                        display: "grid",
                        placeItems: "center",
                        height: "100vh",
                        width: "100vw",
                    }}
                >
                    <LoaderComp />
                </div>
                ;
            </div>
        );
    }

    const calculateTotalAmount = () => {
        return filterOutward.reduce((total, outward) => total + outward.outamount, 0);
    };

    const handleDownload = async () => {
        const totalAmount = calculateTotalAmount();
        const doc = new jsPDF({ orientation: 'landscape' });
        doc.addImage('https://png.pngtree.com/png-clipart/20220125/ourmid/pngtree-liquid-water-drop-splash-three-dimensional-decoration-png-image_4361854.png', 'PNG', 80, 0, 150, 50);
        doc.setFontSize(50);
        doc.text("Expense Report", 150, 60, { align: "center" });
        doc.autoTable({
            html: '#expenseReport',
            startY: 70,
            showFoot: 'lastPage', // Ensure tfoot is shown only on the last page
        });
        doc.setFontSize(20);
        doc.text(`Total Expense Amount: ₹${totalAmount}`, 20, doc.lastAutoTable.finalY + 20);
        doc.save(`Expense_Report_${Date.now()}.pdf`);
    };

    return (
        <>
            <div>
                <div className="datatable-container">
                    <div className="header-tools">
                        <div className="search">
                            <input type="search" className="search-input" placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch} />
                        </div>

                        <label className="label">
                            <select
                                value={selectedFilter || ""}
                                onChange={(e) => handleFilterChange(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Filter
                                </option>
                                {filterOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                                <option onClick={() => handleFilterChange("LOW to HIGH")}>
                                    LOW to HIGH
                                </option>
                                <option onClick={() => handleFilterChange("HIGH to LOW")}>
                                    HIGH to LOW
                                </option>
                            </select>
                        </label>
                        <div className="date">
                            <label htmlFor="from">From</label>
                            <input
                                type="date"
                                name="startDate"
                                id="from"
                                onChange={handleDateEvent}
                            />
                            <label htmlFor="to">To</label>
                            <input
                                type="date"
                                name="endDate"
                                id="to"
                                onChange={handleDateEvent}
                            />
                            <span className="h4"><FaSearch onClick={handleFilterDate} /></span>

                        </div>
                        <div>
                            <Button variant="primary" onClick={handleDownload}>
                                Show Bill
                            </Button>
                        </div>

                    </div>
                    <table className="datatable" id="expenseReport">
                        <thead>
                            <tr>
                                <th>Outward Tid</th>
                                <th>Outward Sid</th>
                                <th>Receipt No.</th>
                                <th>Amount</th>
                                <th>Paid To</th>
                                <th>Transaction Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterOutward.map((outward) => (
                                <tr key={outward.outwardTid} className="table-info">
                                    <td>{outward.outwardTid}</td>
                                    <td>{outwardData?.find(data => data.outwardSid === outward.outwardSid)?.outwardSname}</td>
                                    <td>{outward.voucherno}</td>
                                    <td style={{fontSize:"15px"}}>
                                        <MDBBadge
                                            color={
                                                outward.outamount >= 1000
                                                    ? "success"
                                                    : outward.outamount > 2000
                                                        ? "primary"
                                                        : outward.outamount < 500
                                                            ? "danger"
                                                            : "warning"
                                            }
                                            pill
                                        >
                                            {outward.outamount}
                                        </MDBBadge>
                                    </td>
                                    <td>{outward.paidto}</td>
                                    <td>{formatDateWithoutTime(outward.outtdate)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total Amount:</td>
                                <td style={{ fontSize: "15px" }}>
                                    <MDBBadge color="info" pill>
                                        <b>{calculateTotalAmount()}</b>
                                    </MDBBadge>
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ExpenseReports;
