import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, Modal, Col, Form, Row, Table } from 'react-bootstrap';
// import { useAuth } from '../../context/auth';


export default function FileUpload() {

    const [fileName, setFileName] = useState(undefined);
    const [filePassed, setFilePassed] = useState(false);
    const [isError, setIsError] = useState(false);

    const [docketData, setDocketData] = useState({});

    const [charges, setCharges] = useState({});

    const [fullName, setFullName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleInitial, setMiddleInitial] = useState("");
    const [lastName, setLastName] = useState("");
    const [suffix, setSuffix] = useState("");
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
                    if (res.status === 200) {

                        console.log(res.data);

                        setDocket(res.data.docket);
                        setFullName(res.data.petitioner.name);
                        var fullName = res.data.petitioner.name;
                        var nameArray = fullName.split(" ");
                        if (nameArray.length === 4) {
                            setFirstName(nameArray[0]);
                            setMiddleInitial(nameArray[1][0]);
                            setLastName(nameArray[2]);
                            setSuffix(nameArray[3]);
                        }
                        else if (nameArray.length === 3 && nameArray[1][1] === "." || nameArray[1].length === 1) {
                            setFirstName(nameArray[0]);
                            setMiddleInitial(nameArray[1][0]);
                            setLastName(nameArray[2]);
                        }
                        else if (nameArray.length === 3) {
                            setFirstName(nameArray[0]);
                            setLastName(nameArray[1]);
                            setSuffix(nameArray[2]);
                        }
                        else if (nameArray.length === 2) {
                            setFirstName(nameArray[0]);
                            setLastName(nameArray[1]);
                        }

                        console.log(res.data.charges);

                        setCharges(res.data.charges);

                        setAliases(res.data.petitioner.aliases);
                        setDOB(res.data.petitioner.dob);
                        setOTN(res.data.petition.otn);
                        setArrestOfficer(res.data.petition.arrest_officer);
                        setJudge(res.data.petition.judge);

                        setFilePassed(true);
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
                "charges": [{ "date": "2010-10-10", "description": "Burglary", "disposition": "Held for Court", "grade": "F2", "statute": "18 § 3502 §§ A4" }],
                "petitioner": {
                    "name": "Bob B. Bee",
                    "aliases": ["Total Gym", "Bobby Bee"],
                    "dob": "1965-11-17"
                },
                "petition": {
                    "otn": "N 999999-9",
                    "arrest_agency": "Philadelphia Pd",
                    "arrest_officer": "Affiant",
                    "judge": "Jury And Executioner"
                },
                "docket": "MC-51-CR-1234135-2001"
            }


            //setDocketData(mockData);

            console.log(mockData);

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
                        <input type="file" name="docket_file" onChange={e => { getFile(e.target.files); }} />
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
                                        Docket Number
                                </Form.Label>
                                </Col>
                                <Col md={{ span: 8 }}>
                                    <Form.Control placeholder="Docket Number" value={docket} onChange={e => {
                                        setDocket(e.target.value);
                                    }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={3}>
                                    <Form.Label>
                                        Full Name
                                </Form.Label>
                                </Col>
                                <Col md={{ span: 8 }}>
                                    <Form.Control placeholder="Full Name" value={fullName} onChange={e => {
                                        setFullName(e.target.value);
                                    }} />
                                </Col>
                            </Form.Group>

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
                                <Col sm="1">
                                    <Form.Control placeholder="Middle Initial" value={middleInitial} onChange={e => {
                                        setMiddleInitial(e.target.value);
                                    }} />
                                </Col>
                                <Col sm="3">
                                    <Form.Control placeholder="Last Name" value={lastName} onChange={e => {
                                        setLastName(e.target.value);
                                    }} />
                                </Col>
                                <Col sm="1">
                                    <Form.Control placeholder="Suffix" value={suffix} onChange={e => {
                                        setSuffix(e.target.value);
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
                                        <strong>Address</strong>
                                    </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Control placeholder="Street Address" value={street1} onChange={e => {
                                        setStreet1(e.target.value);
                                    }} />
                                </Col>
                                <Col sm={3}>
                                    <Form.Label>
                                    </Form.Label>
                                </Col>
                                <Col sm="8">
                                    <Form.Control placeholder="Optional Apt/Unit" value={street2} onChange={e => {
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
                                        <strong>Social Security</strong>
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
                                    <Form.Control placeholder="########" value={otn} onChange={e => {
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
                                    <Form.Control placeholder="First Last" value={arrestOfficer} onChange={e => {
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
                                    <Form.Control placeholder="First Last" value={judge} onChange={e => {
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
                                    <Form.Control placeholder="MC-##-CR-#######-YYYY" value={docket} onChange={e => {
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

                            <Form.Group as={Row}>
                                <Col sm={3}>
                                    <Table>
                                        <Table.thead>
                                            <Table.tr>
                                                <Table.th></Table.th>
                                                <Table.th>Table heading</Table.th>
                                            </Table.tr>
                                        </Table.thead>
                                        <Table.tbody>
                                            <Table.tr>
                                                {charges.map(charge => (<Table.td id="charges"> { charge.statute }</Table.td>))}
                                            </Table.tr>
                                        </Table.tbody>
                                    </Table>
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

        </div >
    );
}
