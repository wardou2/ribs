import React, { useEffect, useState } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useParams } from "react-router-dom";

import { Patient, ParamTypes } from "../interfaces";
import { getPatient, updatePatient } from "../api/Patients";

const EditPatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const apiPatient = await getPatient(Number(patientId));
                setPatient(apiPatient);
            } catch (e) {
                // TODO: Better error handling
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
                <Button type="submit">Edit Patient</Button>
            </Form>
        </div>
    );
};

export default EditPatient;

// TODO: Age stuff needs to be sorted out
// TODO: Success Message
