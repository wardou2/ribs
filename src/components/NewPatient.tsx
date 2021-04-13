import React, { useState } from "react";
import { Button, Form, Loader } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Patient } from "../interfaces";
import { newPatient } from "../api/Patients";

const NewPatient = () => {
    const [patient, setPatient] = useState<Patient>({
        firstname: "",
        lastname: "",
        sex_at_birth: "",
        birthdate: new Date(),
        email_address: "",
        street_address: "",
        city: "",
        state: "",
        zipcode: "",
        phone_number: "",
        gender_identity: "",
        number_of_sessions: 0,
    } as Patient);

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

    const sexOptions = [
        { key: "m", text: "Male", value: "M" },
        { key: "f", text: "Female", value: "F" },
        { key: "o", text: "Other", value: "O" },
    ];

    return (
        <div>
            <h3>Add New Patient</h3>
            <Form onSubmit={() => newPatient(patient)}>
                <Form.Group>
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

                    <Form.Select
                        label="Sex at birth"
                        options={sexOptions}
                        value={patient.sex_at_birth}
                        name="sex_at_birth"
                        onChange={(_e, data) => {
                            setPatient(
                                (prev) =>
                                    ({
                                        ...prev,
                                        sex_at_birth: data.value,
                                    } as Patient)
                            );
                        }}
                    />
                    <Form.Input
                        label="Gender Identity"
                        value={patient.gender_identity}
                        name="gender_identity"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Input
                        label="Email"
                        value={patient.email_address}
                        name="email_address"
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Phone Number"
                        value={patient.phone_number}
                        name="phone_number"
                        onChange={handleChange}
                    />
                    <Form.Field>
                        <label>Birthdate</label>
                        <DatePicker
                            selected={patient.birthdate}
                            showYearDropdown
                            maxDate={new Date()}
                            ariaLabelledBy="Birthdate"
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
                    </Form.Field>
                </Form.Group>

                <Form.Group>
                    <Form.Input
                        label="Street Address"
                        value={patient.street_address}
                        name="street_address"
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="City"
                        value={patient.city}
                        name="city"
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="State"
                        value={patient.state}
                        name="state"
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Zip Code"
                        value={patient.zipcode}
                        name="zipcode"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">New Patient</Button>
            </Form>
        </div>
    );
};

export default NewPatient;
