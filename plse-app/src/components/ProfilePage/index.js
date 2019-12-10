import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export default function ProfilePage() {
  const [myUsername, setMyUsername] = useState("");
  const [myFirstName, setMyFirstName] = useState("");
  const [myLastName, setMyLastName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [attorneyName, setAttorneyName] = useState("");
  const [attorneyBar, setAttorneyBar] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgStreet, setOrgStreet] = useState("");
  const [orgCity, setOrgCity] = useState("");
  const [orgState, setOrgState] = useState("");
  const [orgZipcode, setOrgZipcode] = useState("");
  const [orgPhone, setOrgPhone] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // useEffect is the React Hook equivalent to ComponentDidMount
  useEffect(() => {

    const bearer = "Bearer ";
    const token = bearer.concat(localStorage.getItem("access_token"));
    var config = {
      'headers': { 'Authorization': token }
    };

    // Get to return user data
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://testbed.pablovirgo.com/api/v0.1.0/expunger/my-profile/";
    axios.get(proxyurl + url, config)
      .then(
        res => {
          if (res.status === 200) {
            // return data
            console.log(res.data);
            setMyUsername(res.data.user.username);
            setMyFirstName(res.data.user.first_name);
            setMyLastName(res.data.user.last_name);
            setMyEmail(res.data.user.email);

            setAttorneyName(res.data.attorney.name);
            setAttorneyBar(res.data.attorney.bar);
            setOrgName(res.data.organization.name);
            setOrgStreet(res.data.organization.address.street1);
            setOrgCity(res.data.organization.address.city);
            setOrgState(res.data.organization.address.state);
            setOrgZipcode(res.data.organization.address.zipcode);
            setOrgPhone(res.data.organization.phone);
          }
        }
      )
  });

  // onclick for Edit button
  function editProfile() {

    console.log("Edit button clicked");
    setIsEdit(true);

  }

  // POST for profile editing
  function postProfile() {

    console.log("Submit button clicked");

    // This is where we'll put the post

  }

  return (
    <div className="text-left">
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Profile Information</Modal.Title>
          <Button id="editbutton" onClick={editProfile}>Edit</Button>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              Username :
          </Col>
            <Col>
              {myUsername}
            </Col>
          </Row>
          <Row>
            <Col>
              Name :
          </Col>
            <Col>
              {!isEdit && myFirstName} {!isEdit && myLastName}
              {isEdit && <Form.Control placeholder="First Name" onChange={e => {
                setMyFirstName(e.target.value);
              }} />}
              {isEdit && <Form.Control placeholder="Last Name" onChange={e => {
                setMyLastName(e.target.value);
              }} />}
            </Col>
          </Row>
          <Row>
            <Col>
              Email Address :
          </Col>
            <Col>
              {!isEdit && myEmail}
              {isEdit && <Form.Control placeholder="Email" onChange={e => {
                setMyEmail(e.target.value);
              }} />}
            </Col>
          </Row>
          <Row>
            <Col>
              Header Text for Petition :
          </Col>
            <Col>
              <p className="petp">{orgName}</p>
              <p className="petp">BY: {attorneyName}</p>
              <p className="petp">Identification no.:{attorneyBar} </p>
              <p className="petp"> </p>
              <p className="petp">{orgStreet}</p>
              <p className="petp">{orgCity}, {orgState} {orgZipcode}</p>
              <p className="petp">{orgPhone}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              Expungement Petition Signature :
          </Col>
            <Col>
              {attorneyName}, Esquire
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {isEdit && <Button id="submitButton" onClick={postProfile}>Submit</Button>}
        </Modal.Footer>

      </Modal.Dialog>
    </div>
  );
}