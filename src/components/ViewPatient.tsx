import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Patient } from "../interfaces";
import { getPatient } from "../api/Patients";

interface ParamTypes {
    patientId?: string;
}

const ViewPatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        getPatient(Number(patientId)).then(setPatient);
    }, [patientId]);

    return (
        <div>
            {patient && (
                <>
                    <h1>{patient.firstname + " " + patient.lastname}</h1>
                </>
            )}
        </div>
    );
};

export default ViewPatient;
