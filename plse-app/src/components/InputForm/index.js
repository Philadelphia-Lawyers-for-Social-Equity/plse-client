import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap';


export default function InputForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aliases, setAliases] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [twoLetterState, setTwoLetterState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [SSN, setSSN] = useState("");

  const [otn, setOTN] = useState("");
  const [dc, setDC] = useState("");
  const [arrestDate, setArrestDate] = useState("");
  const [arrestOfficer, setArrestOfficer] = useState("");
  const [disposition, setDisposition] = useState("");
  const [judge, setJudge] = useState("");
  const [docket, setDocket] = useState("");
  const [restitutionTotal, setRestitutionTotal] = useState(0.0);
  const [restitutionPaid, setRestitutionPaid] = useState(0.0);


  const [isGenerateReady, setGenerateReady] = useState(false);
  const [isError, setIsError] = useState(false);

  // On click to store the attorney information to local storage
  function storeInfo() {

    // No attorney chosen if blank
    if (firstName === "" || lastName === "" || DOB === "" || address === "" || city === "" || twoLetterState === "" || zipcode === "" || SSN === "") {
      setIsError(true);
    }
    else {
      // store everything to localstorage
      localStorage.setItem('clientFirstName', firstName);
      localStorage.setItem('clientLastName', lastName);
      localStorage.setItem('clientAliases', aliases);
      localStorage.setItem('clientDOB', DOB);
      localStorage.setItem('clientAddress', address);
      localStorage.setItem('clientAddressTwo', addressTwo);
      localStorage.setItem('clientCity', city);
      localStorage.setItem('clientState', twoLetterState);
      localStorage.setItem('clientZipcode', zipcode);
      localStorage.setItem('clientSSN', SSN);
      setGenerateReady(true);
    }
  }

  if (isGenerateReady) {

    // make a text version of the JSON

    const text = '{ "petitioner": {' +
      ' "name": "' + localStorage.getItem("clientFirstName") + " " + localStorage.getItem("clientLastName") + '", ' +
      ' "aliases": "[' + localStorage.getItem("clientAliases") + ']", ' +
      ' "dob": "' + localStorage.getItem("clientDOB") + '", ' +
      ' "ssn": "' + localStorage.getItem("clientSSN") + '", ';

    var addressText = ' "address": {' +
      ' "street1": "' + localStorage.getItem("clientAddress") + '", ' +
      ' "street2": "' + localStorage.getItem("clientAddressTwo") + '", ' +
      ' "city": "' + localStorage.getItem("clientCity") + '", ' +
      ' "state": "' + localStorage.getItem("clientState") + '", ' +
      ' "zipcode": "' + localStorage.getItem("clientZipcode") + '" }}, ';

    // I don't know whether we're going to use the database for petition info so hardcoding for now:
    var petition = ' "petition" : {' +
      ' "date" : "2019-11-2019",' +
      ' "petition_type" : "expungement",' +
      ' "otn" : "otnNumberHardcoded",' +
      ' "dc" : "dcNumberHardcoded",' +
      ' "arrest_date" : "2009-01-20",' +
      ' "arrest_officer" : "Arrest Officer HardCoded",' +
      ' "disposition" : "Dismissed",' +
      ' "judge" : "Judy Sheindlin" }, ';

    var docketPortion = ' "docket" : "MC-51-CR-1234567-2009",';

    var restitution = ' "restitution" : {' +
      ' "total" : "123.45",' +
      ' "paid" : "100.45" } } ';


    var postData = text + addressText + petition + docketPortion + restitution;

    // Mock data from Pablo:
    const mockData = {
      "petitioner": {
        "name": "Bob Bee",
        "aliases": ["Total Gym"],
        "dob": "2001-11-7",
        "ssn": "224-44-5555",
        "address": {
          "street1": "1617 Jfk",
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

    // Make an axios POST call to api/v0.1.0/petition/generate/
    const bearer = "Bearer ";
    const token = bearer.concat(localStorage.getItem("access_token"));
    var config = {
      'headers': { 'Authorization': token }
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://testbed.pablovirgo.com/api/v0.1.0/petition/generate/";
    // axios.post(proxyurl + url, JSON.parse(postData), config)
    axios.post(proxyurl + url, mockData, config)
      .then(
        res => {
          if (res.status === 200) {
            // return data
            console.log("Posted");
            console.log(res.data);
          }
        }
      )
  }

  return (
    <div className="text-center">
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
                <Form.Control placeholder="First Name" onChange={e => {
                  setFirstName(e.target.value);
                }} />
              </Col>
              <Col sm="5">
                <Form.Control placeholder="Last Name" onChange={e => {
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
                <Form.Control placeholder="Aliases (comma-separated)" onChange={e => {
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
                <Form.Control placeholder="yyyy-mm-dd" onChange={e => {
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
                <Form.Control placeholder="Street Name" onChange={e => {
                  setAddress(e.target.value);
                }} />
              </Col>
              <Col sm={3}>
                <Form.Label>
                </Form.Label>
              </Col>
              <Col sm="8">
                <Form.Control onChange={e => {
                  setAddressTwo(e.target.value);
                }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextCityStateZip">
              <Col sm={3}>
                <Form.Label>
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Control placeholder="City" onChange={e => {
                  setCity(e.target.value);
                }} />
              </Col>
              <Col sm={2}>
                <Form.Control placeholder="State (2-Letter)" onChange={e => {
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
                <Form.Control placeholder="Convicted" onChange={e => {
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
                <Form.Control placeholder="AA-##-AA-#######-YYYY" onChange={e => {
                  setDocket(e.target.value);
                }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextRestitution">
              <Col sm={3}>
                <Form.Label>
                  Restitution Amount
                </Form.Label>
              </Col>
              <Col sm={4}>
                <Form.Control placeholder="Total" onChange={e => {
                  setRestitutionTotal(e.target.value);
                }} />
              </Col>
              <Col sm={4}>
                <Form.Control placeholder="Paid" onChange={e => {
                  setRestitutionPaid(e.target.value);
                }} />
              </Col>
            </Form.Group>


            <Row>

              <Col sm={3}>
                <Form.Label>
                </Form.Label>
              </Col>
              <Col sm="4">
                <Button id="ExpungeButton" onClick={storeInfo}>Expunge</Button>
                {isError && <div>Empty Fields</div>}
              </Col>
            </Row>
          </Form>

        </Col>
        <Col></Col>
      </Row>
    </div>
  )
}