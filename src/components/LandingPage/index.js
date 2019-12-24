import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';
import { Button, ButtonGroup, Modal, Col } from 'react-bootstrap';
// import { useAuth } from '../../context/auth';


export default function LandingPage() {
    const [attorneyData, setAttorneyData] = useState([]);
    const [attorneyKey, setAttorneyKey] = useState("");
    const [attorneyName, setAttorneyName] = useState("");
    const [attorneyBar, setAttorneyBar] = useState("");
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
                        // return data
                        setAttorneyData(res.data);
                    }
                }
            )
    }, []); // empty array as the second argument will limit to one get call

    // On click to store the attorney information to local storage
    function choseAttorney() {

        // No attorney chosen if blank
        if (attorneyKey === "") {
            setIsError(true);
        }
        else {
            // store everything to localstorage
            localStorage.setItem('attorneyKey', attorneyKey);
            localStorage.setItem('attorneyName', attorneyName);
            localStorage.setItem('attorneyBar', attorneyBar);
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
                            {attorneyData.map(item => (<Button id="attorneyNames" key={item.pk} onClick={e => {
                                setAttorneyKey(item.pk);
                                setAttorneyName(item.name);
                                setAttorneyBar(item.bar);
                            }}>{item.name}</Button>))}
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
