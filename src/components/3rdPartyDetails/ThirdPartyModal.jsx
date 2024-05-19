import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { MDBValidationItem } from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';



function ThirdPartyModal(props) {
    const [ data, setData ] = useState({
        mobileno: "",
        name: "",
        profession: ""
    });
    const handleChange = (event) => {
        // const { name, value } = event.target;
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.name);
        // console.log(event.target.value);
        setData({
            ...data,
            [ event.target.name ]: event.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        
        axios
      .post("http://localhost:8090/waterwork/add/addThirdParty", data)
      .then((response) => {
        console.log("Response data:", response.data);
        props.onHide();
        if (response.status === 200) {
            props.refreshData();
            setData({
                mobileno: "",
                name: "",
                profession: ""
            })
          Swal.fire('Success', 'Record updated successfully', 'success');
        } else {
          Swal.fire('Error', 'Failed to update record', 'error');
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        Swal.fire('Error', 'Failed to update record', 'error');
      });
    };
    return (
        <Form>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={data.name}
                                name="name"
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Mobile Number"
                                value={data.mobileno}
                                name="mobileno"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <MDBValidationItem className="col-md-4 mt-4">
                            <select className="form-select" aria-label="Default select example" name="profession" value={data.profession} onChange={handleChange}>
                                <option value="" disabled>Select Profession</option>
                                <option value="plumber">Plumber</option>
                                <option value="electrician">Electrician</option>
                            </select>
                        </MDBValidationItem>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button type="submit" onClick={handleSubmit}>Submit form</Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
}

export default ThirdPartyModal;