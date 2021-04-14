import React, { useEffect, useState } from "react";
import { Button, Form, Loader, Dimmer } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useParams, Link, useHistory } from "react-router-dom";

import { Patient, ParamTypes } from "../interfaces";
import { getPatient, updatePatient } from "../api/Patients";

const EditPatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();
    const [apiState, setApiState] = useState<
        "sending" | "finished" | "error" | undefined
    >();
    const history = useHistory();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const apiPatient = await getPatient(Number(patientId));
                setPatient(apiPatient);
            } catch (e) {
                alert(e);
            }
        };
        fetchPatient();
    }, [patientId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPatient(
            (prev) =>
                ({
                    ...prev,
                    [e.target.name]: e.target.value,
                } as Patient)
        );
    };

    if (!patient) return <Loader />;

    const handleSubmit = () => {
        setApiState("sending");

        updatePatient(patient)
            .then(() => {
                setApiState("finished");
            })
            .catch((e) => {
                setApiState("error");
            });
    };

    if (apiState === "sending")
        return (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );

    if (apiState === "finished") {
        return (
            <div>
                {`${patient.firstname} ${patient.lastname} has been udpated!`}
                <div>
                    <Link to="/records">Back to Records</Link>
                </div>
            </div>
        );
    }

    if (apiState === "error") {
        return <div>Something went wrong...</div>;
    }

    return (
        <div>
            <h3>Edit Patient</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="First Name"
                    value={patient.firstname}
                    name="firstname"
                    onChange={handleChange}
                />
                <Form.Input
                    label="Last Name"
                    value={patient.lastname}
                    name="lastname"
                    onChange={handleChange}
                />

                <DatePicker
                    selected={patient.birthdate}
                    showYearDropdown
                    onChange={(date) => {
                        if (date instanceof Date) {
                            setPatient(
                                (prev) =>
                                    ({
                                        ...prev,
                                        birthdate: date,
                                    } as Patient)
                            );
                        }
                    }}
                />
                <Form.Input
                    label="Email"
                    value={patient.email_address}
                    name="email_address"
                    onChange={handleChange}
                />
                <Button.Group>
                    <Button type="button" onClick={() => history.goBack()}>
                        Cancel
                    </Button>
                    <Button.Or></Button.Or>
                    <Button type="submit" positive>
                        Edit Patient
                    </Button>
                </Button.Group>
            </Form>
        </div>
    );
};

export default EditPatient;

// TODO: Age stuff needs to be sorted out
// TODO: Success Message
