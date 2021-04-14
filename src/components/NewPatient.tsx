import React, { useState } from "react";
import { Button, Form, Loader, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import validator from "validator";
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

    // TODO: create type for errors
    const [errors, setErrors] = useState(() => {
        const err: any = {};
        const keys = Object.keys(patient) as Array<keyof typeof patient>;
        keys.forEach((key) => {
            // Check if any fields are empty
            if (typeof patient[key] === "string" && !patient[key]) {
                err[key] = "required";
            }
        });
        return err;
    });
    const [apiError, setApiError] = useState(false);

    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPatient(
            (prev) =>
                ({
                    ...prev,
                    [e.target.name]: e.target.value,
                } as Patient)
        );
        validate(e.target.name, e.target.value);
    };

    const validate = (name: string, value: string) => {
        switch (name) {
            case "email_address":
                if (!value) {
                    setErrors((prev: any) => ({
                        ...prev,
                        [name]: "required",
                    }));
                } else if (!validator.isEmail(value)) {
                    setErrors((prev: any) => ({
                        ...prev,
                        [name]: "invalid",
                    }));
                } else {
                    setErrors((prev: any) => {
                        delete prev[name];
                        return prev;
                    });
                }
                return;
            case "phone_number":
                if (!value) {
                    setErrors((prev: any) => ({
                        ...prev,
                        [name]: "required",
                    }));
                } else if (!validator.isMobilePhone(value)) {
                    setErrors((prev: any) => ({
                        ...prev,
                        [name]: "invalid",
                    }));
                } else {
                    setErrors((prev: any) => {
                        delete prev[name];
                        return prev;
                    });
                }
                return;
            default:
                if (!value) {
                    setErrors((prev: any) => ({
                        ...prev,
                        [name]: "required",
                    }));
                } else {
                    setErrors((prev: any) => {
                        delete prev[name];
                        return prev;
                    });
                }
                return;
        }
    };

    const isValid: boolean =
        errors &&
        Object.keys(errors).length === 0 &&
        errors.constructor === Object;

    if (!patient) return <Loader />;

    const sexOptions = [
        { key: "m", text: "Male", value: "M" },
        { key: "f", text: "Female", value: "F" },
        { key: "o", text: "Other", value: "O" },
    ];

    const handleSubmit = async () => {
        if (isValid) {
            try {
                const id = await newPatient(patient);
                history.push(`/records/view/${id}`);
            } catch (e) {
                setApiError(true);
            }
        }
    };

    return (
        <div>
            <h3>Add New Patient</h3>
            <Form onSubmit={handleSubmit} error={apiError}>
                <Form.Group>
                    <Form.Input
                        label="First Name"
                        value={patient.firstname}
                        name="firstname"
                        onChange={handleChange}
                        error={"firstname" in errors}
                    />
                    <Form.Input
                        label="Last Name"
                        value={patient.lastname}
                        name="lastname"
                        onChange={handleChange}
                        error={"lastname" in errors}
                    />

                    <Form.Select
                        label="Sex at birth"
                        options={sexOptions}
                        value={patient.sex_at_birth}
                        name="sex_at_birth"
                        onChange={(_e, data) => {
                            setPatient((prev) => {
                                validate("sex_at_birth", data.value as string);
                                return {
                                    ...prev,
                                    sex_at_birth: data.value,
                                } as Patient;
                            });
                        }}
                        error={"sex_at_birth" in errors}
                    />
                    <Form.Input
                        label="Gender Identity"
                        value={patient.gender_identity}
                        name="gender_identity"
                        onChange={handleChange}
                        error={"gender_identity" in errors}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Input
                        label="Email"
                        value={patient.email_address}
                        name="email_address"
                        onChange={handleChange}
                        error={"email_address" in errors}
                    />
                    <Form.Input
                        label="Phone Number"
                        value={patient.phone_number}
                        name="phone_number"
                        onChange={handleChange}
                        error={"phone_number" in errors}
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
                        error={"street_address" in errors}
                    />
                    <Form.Input
                        label="City"
                        value={patient.city}
                        name="city"
                        onChange={handleChange}
                        error={"city" in errors}
                    />
                    <Form.Input
                        label="State"
                        value={patient.state}
                        name="state"
                        onChange={handleChange}
                        error={"state" in errors}
                    />
                    <Form.Input
                        label="Zip Code"
                        value={patient.zipcode}
                        name="zipcode"
                        onChange={handleChange}
                        error={"zipcode" in errors}
                    />
                </Form.Group>
                <Button type="submit" disabled={!isValid}>
                    New Patient
                </Button>
                <Message
                    error
                    header="Something went wrong"
                    content="Please try again later."
                />
            </Form>
        </div>
    );
};

export default NewPatient;
