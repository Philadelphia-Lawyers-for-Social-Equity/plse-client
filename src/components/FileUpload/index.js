import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, Modal, Col, Form, Row } from 'react-bootstrap';
// import { useAuth } from '../../context/auth';


export default function FileUpload() {

    const [fileName, setFileName] = useState(undefined);
    const [filePassed, setFilePassed] = useState(false);
    const [isError, setIsError] = useState(false);

    const [docketData, setDocketData] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [aliases, setAliases] = useState("");
    const [dob, setDOB] = useState("");
    const [street1, setStreet1] = useState("");
    const [street2, setStreet2] = useState("");
    const [city, setCity] = useState("");
    const [twoLetterState, setTwoLetterState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [ssn, setSSN] = useState("");
    const [otn, setOTN] = useState("");
    const [dc, setDC] = useState("");
    const [arrestDate, setArrestDate] = useState("");
    const [arrestOfficer, setArrestOfficer] = useState("");
    const [disposition, setDisposition] = useState("");
    const [judge, setJudge] = useState("");
    const [docket, setDocket] = useState("");
    const [restitutionTotal, setRestitutionTotal] = useState(0.0);
    const [restitutionPaid, setRestitutionPaid] = useState(0.0);

    // On click for the cancel button
    function returnLogin() {
        return <Redirect to="/login" />;
    }

    // On change for getting file
    function getFile(files) {
        setFileName(files[0]);
    }

    // On click to store the attorney information to local storage
    function choseFile() {

        console.log(fileName);

        // Need to check if a file is chosen
        if (fileName === undefined) {
            setIsError(true);
        }
        else {

            let pdfdata = new FormData();
            pdfdata.append('name', 'docket_file');
            pdfdata.append('docket_file', fileName);

            console.log(pdfdata);

            // post to generate profile
            const url = process.env.REACT_APP_BACKEND_HOST + "/api/v0.1.0/petition/parse-docket/";
            const bearer = "Bearer ";
            const token = bearer.concat(localStorage.getItem("access_token"));
            var config = {
                'headers': { 'Authorization': token }
            };

            axios.post(url, pdfdata, config)
                .then(res => {
                    console.log(res);
                    // setFilePassed(true);
                    if (res.status === 200) {
                        setFilePassed(true);
                        setDocketData(res.data);
                        console.log(docketData.petitioner);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (filePassed) {
            // redirect to input form
            //return <Redirect to="/inputform" />;

            const mockData = {
                "petitioner": {
                    "name": "Bob Bee",
                    "aliases": ["Total Gym"],
                    "dob": "2001-11-7",
                    "ssn": "224-44-5555",
                    "address": {
                    "street1": "1617 Jfk",
                    "street2": "Apt 1",
                    "city": "Philadelphia",
                    "state": "PA",
                    "zipcode": "21711"
                    }
                },
                "petition": {
                    "date": "2019-11-27",
                    "petition_type": "expungement",
                    "otn": "Offense Tracking Number",
                    "dc": "wat is this",
                    "arrest_date": "2017-04-16",
                    "arrest_officer": "Gerry Mander",
                    "disposition": "Dismissed",
                    "judge": "Jury And Executioner"
                },
                "docket": "MC-51-CR-1234135-2001",
                "restitution": {
                    "total": 20000,
                    "paid": 36
                }
            }

            //setDocketData(mockData);

            console.log(mockData);
            console.log(docketData);

        }
    }

    return (
        <div className="text-center">
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Upload File</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Col>
                        <input type="file" name="docket_file" onChange={e => {getFile(e.target.files);}} /> 
                    </Col>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="returnToLoginButton" onClick={returnLogin}>Cancel</Button>
                    <Button id="fileButton" onClick={choseFile}>Submit</Button>
                    {isError && <div>Please select a file</div>}
                </Modal.Footer>
            </Modal.Dialog>


            {filePassed && <div>
                
                <Row style={{ margin: `80px` }}>

                    <Col></Col>
                    <Col md={6}>

                    <Form>
                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            Client's Name
                    </Form.Label>
                        </Col>
                        <Col md={{ span: 3 }}>
                            <Form.Control placeholder="First Name" value={firstName} onChange={e => {
                            setFirstName(e.target.value);
                            }} />
                        </Col>
                        <Col sm="5">
                            <Form.Control placeholder="Last Name" value={lastName} onChange={e => {
                            setLastName(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            Aliases
                    </Form.Label>
                        </Col>
                        <Col md={{ span: 8 }}>
                            <Form.Control placeholder="Aliases (comma-separated)" value={aliases} onChange={e => {
                            setAliases(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            Date of Birth
                    </Form.Label>
                        </Col>
                        <Col md={{ span: 3 }}>
                            <Form.Control placeholder="yyyy-mm-dd" value={dob} onChange={e => {
                            setDOB(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextAddress">
                        <Col sm={3}>
                            <Form.Label>
                            Address
                    </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Control placeholder="Street Name" value={street1} onChange={e => {
                            setStreet1(e.target.value);
                            }} />
                        </Col>
                        <Col sm={3}>
                            <Form.Label>
                            </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Control onChange={e => {
                            setStreet2(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextCityStateZip">
                        <Col sm={3}>
                            <Form.Label>
                            </Form.Label>
                        </Col>
                        <Col sm={4}>
                            <Form.Control placeholder="City" value={city} onChange={e => {
                            setCity(e.target.value);
                            }} />
                        </Col>
                        <Col sm={2}>
                            <Form.Control placeholder="State (2-Letter)" value={twoLetterState} onChange={e => {
                            setTwoLetterState(e.target.value);
                            }} />
                        </Col>
                        <Col sm={2}>
                            <Form.Control placeholder="Zip" onChange={e => {
                            setZipcode(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextSSNum">
                        <Col sm={3}>
                            <Form.Label>
                            Social Security
                    </Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Control placeholder="###-##-####" onChange={e => {
                            setSSN(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            OTN Number
                    </Form.Label>
                        </Col>
                        <Col md={{ span: 8 }}>
                            <Form.Control placeholder="########" onChange={e => {
                            setOTN(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            DC
                    </Form.Label>
                        </Col>
                        <Col md={{ span: 8 }}>
                            <Form.Control placeholder="########" onChange={e => {
                            setDC(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            Arrest Date
                    </Form.Label>
                        </Col>
                        <Col md={{ span: 8 }}>
                            <Form.Control placeholder="yyyy-mm-dd" onChange={e => {
                            setArrestDate(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Col sm={3}>
                            <Form.Label>
                            Arrest Officer
                    </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Control placeholder="First Last" onChange={e => {
                            setArrestOfficer(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Col sm={3}>
                            <Form.Label>
                            Disposition
                    </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Control placeholder="Dismissed" onChange={e => {
                            setDisposition(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Col sm={3}>
                            <Form.Label>
                            Full Name of Judge
                    </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Control placeholder="First Last" onChange={e => {
                            setJudge(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row} >
                        <Col sm={3}>
                            <Form.Label>
                            Docket ID number
                    </Form.Label>
                        </Col>
                        <Col sm="8">
                            <Form.Control placeholder="MC-##-CR-#######-YYYY" onChange={e => {
                            setDocket(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                        <Col sm={3}>
                            <Form.Label>
                            Restitution Amount
                            </Form.Label>
                        </Col>
                        <Col sm={4}>
                            <Form.Control placeholder="Total" id="totalRestitution" onChange={e => {
                            setRestitutionTotal(e.target.value);
                            }} />
                        </Col>
                        <Col sm={4}>
                            <Form.Control placeholder="Paid" id="paidRestitution" onChange={e => {
                            setRestitutionPaid(e.target.value);
                            }} />
                        </Col>
                        </Form.Group>


                        {/* <Row>

                        <Col sm={3}>
                            <Form.Label>
                            </Form.Label>
                        </Col>
                        <Col sm="4">
                            <Button id="ExpungeButton" onClick={checkInfo}>Expunge</Button>
                            {isError && <div>Empty Fields</div>}
                        </Col>
                        </Row> */}
                    </Form>

                    </Col>
                    <Col></Col>
                </Row>

                </div>}

        </div>
    );
}
