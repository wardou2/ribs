import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { Table } from "semantic-ui-react";

import { Patient } from "../interfaces";

type PatientTableProps = {
    patients: Patient[];
};

const PatientTable = ({ patients }: PatientTableProps) => {
    const calculateAge = (birthdate: number) => {
        //https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const renderTableRows = () => {
        return patients.map((patient, i) => (
            <Table.Row key={i}>
                <Table.Cell>{`${patient.firstname} ${patient.lastname} `}</Table.Cell>
                <Table.Cell>{calculateAge(patient.birthdate)}</Table.Cell>
                <Table.Cell>{patient.email_address}</Table.Cell>
                <Table.Cell>
                    <Link to={`${url}/${patient.id}`}> View </Link>
                </Table.Cell>
                <Table.Cell>Edit</Table.Cell>
                <Table.Cell>Delete</Table.Cell>
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
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderTableRows()}</Table.Body>
            </Table>
        </div>
    );
};

export default PatientTable;
