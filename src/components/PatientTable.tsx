import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { Table } from "semantic-ui-react";

import { Patient, AuthLevel } from "../interfaces";
import { utcToAge } from "../util/Util";
import { useAuth } from "../util/Authenticate";

type PatientTableProps = {
    patients: Patient[];
};

const PatientTable = ({ patients }: PatientTableProps) => {
    const auth = useAuth();
    const { authLevel } = auth;
    const renderTableRows = () => {
        return patients.map((patient, i) => (
            <Table.Row key={i}>
                <Table.Cell>{`${patient.firstname} ${patient.lastname} `}</Table.Cell>
                <Table.Cell>{utcToAge(patient.birthdate)}</Table.Cell>
                <Table.Cell>{patient.email_address}</Table.Cell>
                <Table.Cell>
                    <Link to={`${url}/view/${patient.id}`}> View </Link>
                </Table.Cell>
                {authLevel === AuthLevel.Administrator && (
                    <>
                        <Table.Cell>
                            <Link to={`${url}/edit/${patient.id}`}> Edit </Link>
                        </Table.Cell>

                        <Table.Cell>
                            <Link to={`${url}/delete/${patient.id}`}>
                                Delete
                            </Link>
                        </Table.Cell>
                    </>
                )}
            </Table.Row>
        ));
    };

    let { url } = useRouteMatch();

    return (
        <div>
            <Table celled striped padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Patient Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>View</Table.HeaderCell>
                        {authLevel === AuthLevel.Administrator && (
                            <>
                                <Table.HeaderCell>Edit</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderTableRows()}</Table.Body>
            </Table>
        </div>
    );
};

export default PatientTable;
