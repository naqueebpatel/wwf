import React, { useEffect, useState } from 'react';
import ThirdPartyCard from './ThirdPartyCard';
import './thirdparty.css';
import ThirdPartyModal from './ThirdPartyModal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ThirdPartyDetails = ({ setCollapsed }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thirdPartyList, setThirdPartyList] = useState([]);

    useEffect(() => {
        setCollapsed(true);
    }, [setCollapsed]);

    useEffect(() => {
        fetchThirdPartyData();
    }, []);

    const fetchThirdPartyData = () => {
        axios.get('http://localhost:8090/waterwork/get/getallThirdParty')
            .then(response => {
                setThirdPartyList(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the third party data!', error);
            });
    };

    const refreshData = () => {
        fetchThirdPartyData();
    };

    return (
        <>
            <Button
                style={{ position: "relative", top: "10px" }}
                variant="primary"
                className='mx-auto w-auto d-block'
                onClick={() => setIsModalOpen(true)}
            >
                Add Details
            </Button>
            <ThirdPartyModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                refreshData={refreshData}
            />
            <div className='space mt-5'>
                
                    {thirdPartyList.map((thirdParty, index) => (
                        <ThirdPartyCard
                            key={index}
                            name={thirdParty.name}
                            mobileno={thirdParty.mobileno}
                            profession={thirdParty.profession}
                            email={thirdParty.email} // Assuming email is part of the data
                        />
                    ))}
            
            </div>
        </>
    );
};

export default ThirdPartyDetails;
