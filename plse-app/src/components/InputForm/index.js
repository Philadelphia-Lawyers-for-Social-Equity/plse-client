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
      ' "aliases": "' + localStorage.getItem("clientAliases") + '", ' +
      ' "dob": "' + localStorage.getItem("clientDOB") + '", ' +
      ' "ssn": "' + localStorage.getItem("clientSSN") + '", ';

    var addressText = ' "address": {' +
      ' "street1": "' + localStorage.getItem("clientAddress") + '", ' +
      ' "street2": "' + localStorage.getItem("clientAddressTwo") + '", ' +
      ' "city": "' + localStorage.getItem("clientCity") + '", ' +
      ' "state": "' + localStorage.getItem("clientState") + '", ' +
      ' "zipcode": "' + localStorage.getItem("clientZipcode") + '" }}, ';

    // I don't know whether they're going to use the database for petition info so hardcoding for now:
    var petition = ' "petition" : {' +
      ' "date" : "2019-11-2019",' +
      ' "petition_type" : "expungement",' +
      ' "otn" : "otnNumberHardcoded",' +
      ' "dc" : "dcNumberHardcoded",' +
      ' "arrest_date" : "2009-01-20",' +
      ' "arrest_officer" : "Arrest Officer HardCoded",' +
      ' "disposition" : "Dismissed",' +
      ' "judge" : "Judy Sheindlin" }, ';

    var docket = ' "docket" : "MC-51-CR-1234567-2009",';

    var restitution = ' "restitution" : {' +
      ' "total" : "123.45",' +
      ' "paid" : "100.45" } } ';


    var postData = text + addressText + petition + docket + restitution;

    console.log(postData);
    
    // Make an axios POST call to api/v0.1.0/petition/generate/

    const bearer = "Bearer ";
    const token = bearer.concat(localStorage.getItem("access_token"));
    var config = {
        'headers': { 'Authorization': token }
    };

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://testbed.pablovirgo.com/api/v0.1.0/petition/generate/";
    axios.post(proxyurl + url, JSON.parse(postData), config)
      .then(
        res => {
          if (res.status === 200) {
            // return data
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

            <Form.Group as={Row} controlId="formPlaintextEmail">
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

            <Form.Group as={Row} controlId="formPlaintextEmail">
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
                <Form.Control placeholder="PA" onChange={e => {
                  setTwoLetterState(e.target.value);
                }} />
              </Col>
              <Col sm={2}>
                <Form.Control placeholder="Zip" onChange={e => {
                  setZipcode(e.target.value);
                }} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Col sm={3}>
                <Form.Label>
                  Social Security
          </Form.Label>
              </Col>
              <Col sm="4">
                <Form.Control placeholder="###-##-####" onChange={e => {
                  setSSN(e.target.value);
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