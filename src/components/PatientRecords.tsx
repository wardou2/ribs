import React, { useState, useEffect } from "react";

import { Patient } from "../interfaces";
import { getPatients } from "../api/Patients";
import PatientTable from "./PatientTable";

const PatientRecords = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
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
            <PatientTable patients={patients} />
        </div>
    );
};

export default PatientRecords;
