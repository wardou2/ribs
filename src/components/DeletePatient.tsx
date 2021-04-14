import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Button, Loader, Dimmer } from "semantic-ui-react";

import { getPatient, deletePatient } from "../api/Patients";
import { ParamTypes, Patient } from "../interfaces";

const DeletePatient = () => {
    const { patientId } = useParams<ParamTypes>();
    const [patient, setPatient] = useState<Patient>();

    const [apiState, setApiState] = useState<
        "sending" | "finished" | "error" | undefined
    >();

    const history = useHistory();

    useEffect(() => {
        const retrievePatient = async () => {
            try {
                const res = await getPatient(Number(patientId));
                setPatient(res);
            } catch (e) {
                history.push("/records/1");
            }
        };
        retrievePatient();
    }, [history, patientId]);

    const handleDelete = async () => {
        setApiState("sending");
        deletePatient(Number(patientId))
            .then(() => {
                setApiState("finished");
            })
            .catch((e) => {
                setApiState("error");
            });
    };

    if (!patient) return <div>Loading...</div>;

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
                    <Link to="/records/1">Back to Records</Link>
                </div>
            </div>
        );
    }

    if (apiState === "error") {
        return <div>Something went wrong...</div>;
    }

    return (
        <div>
            {`Are you sure you want to delete ${patient?.firstname}
            ${patient?.lastname}?`}
            <div>
                <Button.Group>
                    <Button onClick={() => history.goBack()}>
                        No, I didn't mean it!
                    </Button>
                    <Button.Or></Button.Or>
                    <Button negative onClick={handleDelete}>
                        Yes, I hate them
                    </Button>
                </Button.Group>
            </div>
        </div>
    );
};

export default DeletePatient;
