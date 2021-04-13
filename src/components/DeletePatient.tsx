import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Loader, Dimmer } from "semantic-ui-react";

import { getPatient, deletePatient } from "../api/Patients";
import { ParamTypes, Patient } from "../interfaces";

const DeletePatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();

    const [apiState, setApiState] = useState<
        "sending" | "finished" | undefined
    >();

    const history = useHistory();

    useEffect(() => {
        const retrievePatient = async () => {
            try {
                const res = await getPatient(Number(patientId));
                setPatient(res);
            } catch (e) {
                history.push("/records");
            }
        };
        retrievePatient();
    }, [history, patientId]);

    const handleDelete = async () => {
        setApiState("sending");
        try {
            await deletePatient(Number(patientId));
            setApiState("finished");
        } catch (e) {
            // TODO: Better error handling
            alert(e);
        }
    };

    if (apiState === "sending")
        return (
            <Dimmer active>
                <Loader />
            </Dimmer>
        );

    if (apiState === "finished") {
        return (
            <div>
                {`${patient?.firstname} ${patient?.lastname} has been deleted!`}
                <div>
                    <Link to="/records">Back to Records</Link>
                </div>
            </div>
        );
    }
    return (
        <div>
            {`Are you sure you want to delete ${patient?.firstname}
            ${patient?.lastname}?`}
            <div>
                <Button onClick={() => history.push("/records")}>
                    No, I didn't mean it, I'm so sorry!
                </Button>

                <Button negative onClick={handleDelete}>
                    Yes, I hate them
                </Button>
            </div>
        </div>
    );
};

export default DeletePatient;