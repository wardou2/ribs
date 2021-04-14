import React, { useState, useEffect } from "react";
import { Pagination, Button, PaginationProps } from "semantic-ui-react";

import { AuthLevel, Patient, ParamTypes } from "../interfaces";
import { getPatients } from "../api/Patients";
import PatientTable from "./PatientTable";
import { useAuth } from "../util/Authenticate";
import { useHistory, useParams } from "react-router-dom";

const PatientRecords = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [error, setError] = useState("");

    const params = useParams<ParamTypes>();
    const viewPage = Number(params.viewPage);

    const PATIENTS_PER_PAGE = 10;
    const numberOfPages = Math.ceil(patients.length / PATIENTS_PER_PAGE);

    const auth = useAuth();
    const { authLevel } = auth;

    const handlePageChange = (
        _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        data: PaginationProps
    ) => {
        history.push(`/records/${data.activePage}`);
    };

    const history = useHistory();

    useEffect(() => {
        const retrievePatients = async () => {
            try {
                const patients = await getPatients();
                setPatients(patients);
            } catch (e) {
                setError(e);
            }
        };
        retrievePatients();
    }, []);

    if (error) return <div>Something went wrong.</div>;

    return (
        <div>
            <h3>Patient Information</h3>
            <PatientTable
                patients={patients.slice(
                    (viewPage - 1) * PATIENTS_PER_PAGE,
                    viewPage * PATIENTS_PER_PAGE
                )}
            />
            <div className="records__bottomrow">
                <Pagination
                    totalPages={numberOfPages}
                    activePage={viewPage}
                    onPageChange={handlePageChange}
                />
                {authLevel === AuthLevel.Administrator && (
                    <div>
                        <Button
                            onClick={() => {
                                history.push("/records/new");
                            }}
                        >
                            Add New Patient
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientRecords;
