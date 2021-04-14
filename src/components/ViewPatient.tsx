import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";

import { Patient, ParamTypes } from "../interfaces";
import { getPatient } from "../api/Patients";
import { utcToAge } from "../util/Util";

const ViewPatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();
    const [error, setError] = useState("");

    const history = useHistory();

    useEffect(() => {
        const retrievePatient = async () => {
            try {
                const patient = await getPatient(Number(patientId));
                setPatient(patient);
            } catch (e) {
                setError(e.message);
            }
        };
        retrievePatient();
    }, [patientId]);

    if (error) return <div>Something went wrong.</div>;
    if (!patient) return <div>Loading...</div>;

    return (
        <div className="center-content">
            <Table celled striped collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan="2">
                            {patient.firstname} {patient.lastname}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Gender</Table.Cell>
                        <Table.Cell>{patient.gender_identity}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Sex At Birth</Table.Cell>
                        <Table.Cell>{patient.sex_at_birth}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Date of Birth</Table.Cell>
                        <Table.Cell>{`${
                            patient.birthdate.getUTCMonth() + 1
                        }/${patient.birthdate.getUTCDate()}/${patient.birthdate.getUTCFullYear()}`}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Age</Table.Cell>
                        <Table.Cell>{utcToAge(patient.birthdate)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Height (cm)</Table.Cell>
                        <Table.Cell>{patient.height}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button onClick={() => history.goBack()}>Back to records</Button>
        </div>
    );
};

export default ViewPatient;
