import React, { useState, useEffect } from "react";
import { Pagination, Button } from "semantic-ui-react";

import { AuthLevel, Patient } from "../interfaces";
import { getPatients } from "../api/Patients";
import PatientTable from "./PatientTable";
import { useAuth } from "../util/Authenticate";
import { useHistory } from "react-router-dom";

const PatientRecords = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [activePage, setActivePage] = useState(1);

    const PATIENTS_PER_PAGE = 10;
    const numberOfPages = Math.ceil(patients.length / PATIENTS_PER_PAGE);

    const auth = useAuth();
    const { authLevel } = auth;

    const handlePageChange = (_e: any, data: any) => {
        setActivePage(data.activePage);
    };

    const history = useHistory();

    useEffect(() => {
        getPatients()
            .then((payload) => {
                setPatients(payload);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            <h1>Patient Records</h1>
            <PatientTable
                patients={patients.slice(
                    (activePage - 1) * PATIENTS_PER_PAGE,
                    activePage * PATIENTS_PER_PAGE
                )}
            />
            <Pagination
                totalPages={numberOfPages}
                activePage={activePage}
                onPageChange={handlePageChange}
            />
            {authLevel === AuthLevel.Administrator && (
                <Button
                    onClick={() => {
                        history.push("/records/new");
                    }}
                >
                    Add New Patient
                </Button>
            )}
        </div>
    );
};

export default PatientRecords;
