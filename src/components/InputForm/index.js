import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, Form, Col, Row } from 'react-bootstrap';


export default function InputForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aliases, setAliases] = useState("");
  const [dob, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
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

  // const [isGenerateReady, setGenerateReady] = useState(false);
  const [isError, setIsError] = useState(false);

  // On click to store the client information to local storage
  function checkInfo() {

    // No attorney chosen if blank
    if (firstName === "" || lastName === "" || dob === "" || address === "" || city === "" || twoLetterState === "" || zipcode === "" || ssn === "") {
      setIsError(true);
    }
    else {
      // Make the Post call
      getDocFile();
    }
  }

  function getDocFile() {

    var fullName = firstName + " " + lastName;
    var aliasArray = aliases.split(',');

    // Current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const realData = {
      "petitioner": {
        "name": fullName,
        "aliases": aliasArray,
        "dob": dob,
        "ssn": ssn,
        "address": {
          "street1": address,
          "city": city,
          "state": twoLetterState,
          "zipcode": zipcode
        }
      },
      "petition": {
        "date": today,
        "petition_type": "expungement",
        "otn": otn,
        "dc": dc,
        "arrest_date": arrestDate,
        "arrest_officer": arrestOfficer,
        "disposition": disposition,
        "judge": judge
      },
      "docket": docket,
      "restitution": {
        "total": parseFloat(restitutionTotal),
        "paid": parseFloat(restitutionPaid)
      }
    }

    // console.log(realData);
    
    // Mock data from Pablo that we know will work
    // const mockData = {
    //   "petitioner": {
    //     "name": "Bob Bee",
    //     "aliases": ["Total Gym"],
    //     "dob": "2001-11-7",
    //     "ssn": "224-44-5555",
    //     "address": {
    //       "street1": "1617 Jfk",
    //       "city": "Philadelphia",
    //       "state": "PA",
    //       "zipcode": "21711"
    //     }
    //   },
    //   "petition": {
    //     "date": "2019-11-27",
    //     "petition_type": "expungement",
    //     "otn": "Offense Tracking Number",
    //     "dc": "wat is this",
    //     "arrest_date": "2017-04-16",
    //     "arrest_officer": "Gerry Mander",
    //     "disposition": "Dismissed",
    //     "judge": "Jury And Executioner"
    //   },
    //   "docket": "MC-51-CR-1234135-2001",
//       "charges" : {
//          "statute" : "",
//          "description" : "description of charges",
//          "grade" : "",
//          "date" : "2010-10-10",
//          "disposition" : "Withdrawn"
//        }

    //   "restitution": {
    //     "total": 20000,
    //     "paid": 36
    //   }
    // }

    // Make an axios POST call to api/v0.2.0/petition/generate/
    const bearer = "Bearer ";
    const token = bearer.concat(localStorage.getItem("access_token"));
    var config = {
      'responseType': 'arraybuffer',
      'headers': { 'Authorization': token }
    };

    const url = process.env.REACT_APP_BACKEND_HOST + "/api/v0.2.0/petition/generate/";

    axios.post(url, realData, config)
      .then(
        res => {
          if (res.status === 200) {
            // return data
            // console.log("Posted");
            let blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }),
              downloadUrl = window.URL.createObjectURL(blob),
              filename = "",
              disposition = res.headers["content-disposition"];

            // console.log(blob);
            // console.log(disposition); // disposition is 'attachment; filename="petition.docx"'

            if (disposition && disposition.indexOf("attachment") !== -1) {
              let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
                matches = filenameRegex.exec(disposition);

              if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, "");
              }
            }

            let a = document.createElement("a");
            if (typeof a.download === "undefined") {
              window.location.href = downloadUrl;
            } else {
              a.href = downloadUrl;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
            }
          } //close res status 200
        } //close res
      ); //close then
  } //close isGenerateReady

  return (
    <div className="text-center">
      <Row style={{ margin: `80px` }}>
        <Form>
          <Form.Group>
            <Form.File className="position-relative" required
              name="file"
              label="File"
              id="validationFile"
              feedbackTooltip
            />
            </Form.Group>
          </Form>
      </Row>


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


            <Row>

              <Col sm={3}>
                <Form.Label>
                </Form.Label>
              </Col>
              <Col sm="4">
                <Button id="ExpungeButton" onClick={checkInfo}>Expunge</Button>
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
