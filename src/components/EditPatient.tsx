import React, { useEffect, useState } from "react";
import { Button, Form, Loader } from "semantic-ui-react";

import { useParams } from "react-router-dom";

import { Patient } from "../interfaces";
import { getPatient, updatePatient } from "../api/Patients";

interface ParamTypes {
    patientId?: string;
}

const EditPatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        getPatient(Number(patientId)).then(setPatient);
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

    return (
        <div>
            <h3>Edit Patient</h3>
            <Form onSubmit={() => updatePatient(patient)}>
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
                <Form.Input label="Age" />
                <Form.Input
                    label="Email"
                    value={patient.email_address}
                    name="email_address"
                    onChange={handleChange}
                />
                <Button type="submit">Edit Patient</Button>
            </Form>
        </div>
    );
};

export default EditPatient;

//TODO: Age stuff needs to be sorted out
