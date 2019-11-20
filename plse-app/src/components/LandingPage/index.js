import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, ButtonGroup, Modal, Col } from 'react-bootstrap';
// import { useAuth } from '../../context/auth';


export default function LandingPage() {
    const [attorney, setAttorney] = useState(""); // onclick to set attorney
    const [isAttorneyChosen, setAttorneyChosen] = useState(false);
    const [isError, setIsError] = useState(false);

    // useEffect is the React Hook equivalent to ComponentDidMount
    useEffect(() => {

        const bearer = "Bearer ";
        const token = bearer.concat(localStorage.getItem("access_token"));
        var config = {
            'headers': { 'Authorization': token }
        };

        // Get to return all attorneys (PKs are integers)
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "http://testbed.pablovirgo.com/api/v0.1.0/expunger/attorneys/";
        axios.get(proxyurl + url, config)
            .then(
                res => {
                    if (res.status === 200) {
                        // return data should be rendered to the buttons
                        console.log(res.data[0]);
                    }
                }
            )
    });

    // On click to store the attorney information to local storage
    function choseAttorney() {

        if (attorney === "") {
            setIsError(true);
        }
        else {
            // store everything to localstorage
            localStorage.setItem('attorney', attorney);
            setAttorneyChosen(true);
        }
    }

    if (isAttorneyChosen) {
        return <Redirect to="/inputform" />;
    }

    return (
        <div className="text-center">
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Attorneys</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Col>
                        Please select the attorney that you will be filing for:
                        <ButtonGroup vertical >
                            <Button id="attorneyNames" value={attorney} onClick={e => {
                                setAttorney(e.target.value);
                            }}>Carl Oxholm III</Button>
                            <Button id="attorneyNames" value={attorney} onClick={e => {
                                setAttorney(e.target.value);
                            }}>Rachel Miller</Button>
                            <Button id="attorneyNames" value={attorney} onClick={e => {
                                setAttorney(e.target.value);
                            }}>Taylor Pacheco</Button>
                            <Button id="attorneyNames" value={attorney} onClick={e => {
                                setAttorney(e.target.value);
                            }}>Sarah Coyle</Button>
                            <Button id="attorneyNames" value={attorney} onClick={e => {
                                setAttorney(e.target.value);
                            }}>Executive Director</Button>
                        </ButtonGroup>
                    </Col>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="cancelButton">Cancel</Button>
                    <Button id="attorneyNames" onClick={choseAttorney}>Select</Button>
                    {isError && <div>Please select an attorney</div>}
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
