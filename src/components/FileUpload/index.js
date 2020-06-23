import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
//import "./style.css";
import axios from 'axios';
import { Button, Modal, Col } from 'react-bootstrap';
// import { useAuth } from '../../context/auth';


export default function FileUpload() {
    // const [attorneyData, setAttorneyData] = useState([]);
    const [fileName, setFileName] = useState([]);
    // const [attorneyName, setAttorneyName] = useState("");
    // const [attorneyBar, setAttorneyBar] = useState("");
    // const [attorneyURL, setAttorneyURL] = useState("");
    const [isFileChosen, setFileChosen] = useState(false);
    const [filePassed, setFilePassed] = useState(false);
    const [isError, setIsError] = useState(false);

    // useEffect is the React Hook equivalent to ComponentDidMount
    // useEffect(() => {

    //     const bearer = "Bearer ";
    //     const token = bearer.concat(localStorage.getItem("access_token"));
    //     var config = {
    //         'headers': { 'Authorization': token }
    //     };

    //     // Get to return all attorneys (PKs are integers)
    //     const url = process.env.REACT_APP_BACKEND_HOST + "/api/v0.1.0/expunger/attorneys/";
    //     axios.get(url, config)
    //         .then(
    //             res => {
    //                 if (res.status === 200) {
    //                     // return data
    //                     setAttorneyData(res.data);
    //                 }
    //             }
    //         )
    // }, []); // empty array as the second argument will limit to one get call


    // On click for the cancel button
    function returnLogin() {
        return <Redirect to="/login" />;
    }

    // On click to store the attorney information to local storage
    function choseFile() {

        console.log(fileName);

        // Need to check if a file is chosen
        if (fileName === "") {
            setIsError(true);
        }
        else {
            setFileChosen(true);
        }

        if (isFileChosen) {

            const pdffile = {
                "docket_file": fileName
            };

            // post to generate profile
            const url = process.env.REACT_APP_BACKEND_HOST + "/api/v0.2.0/petition/parse-docket/";
            const bearer = "Bearer ";
            const token = bearer.concat(localStorage.getItem("access_token"));
            var config = {
                'headers': { 'Authorization': token }
            };

            axios.post(url, pdffile, config)
                .then(res => {
                    console.log(res);
                    if (res.status === 201) {
                        setFilePassed(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (filePassed) {
            // redirect to input form
            return <Redirect to="/inputform" />;
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
                        <input type="file" onChange={e => { setFileName(e.target.file[0]); }} /> 
                    </Col>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="cancelButton" onClick={returnLogin}>Cancel</Button>
                    <Button id="file" onClick={choseFile}>Submit File</Button>
                    {isError && <div>Please select a file</div>}
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
