import { Patient } from "../interfaces";

import { BASE_URL } from "./constants";

const patientApiToLocal = (patients: any[]) =>
    patients.map((patient: any) => {
        patient.birthdate = new Date(patient.birthdate);
        return patient as Patient;
    });

const patientLocalToApi = (patients: Patient[]) =>
    patients.map((patient: any) => {
        patient.birthdate = patient.birthdate.getTime();
        delete patient.created_by_user_id;
        delete patient.created_datetime;
        delete patient.number_of_sessions;
        return patient;
    });

export const getPatients = async (): Promise<Patient[]> => {
    const token = localStorage.getItem("token");
    //TODO: Error handle
    // if (!token) return;

    const response = await fetch(`${BASE_URL}/api/1.0/Patient`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    } else {
        const patients = patientApiToLocal(body.payload);
        return patients as Patient[];
    }
};

export const getPatient = async (patientId: number): Promise<Patient> => {
    const token = localStorage.getItem("token");
    //TODO: Error handle
    // if (!token) return;

    const response = await fetch(`${BASE_URL}/api/1.0/Patient/${patientId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    } else {
        const patient = patientApiToLocal([body.payload])[0];
        return patient as Patient;
    }
};

export const updatePatient = async (patient: Patient): Promise<any> => {
    const token = localStorage.getItem("token");
    const apiPatient = patientLocalToApi([patient])[0];
    const { id, ...rest } = apiPatient;

    const response = await fetch(`${BASE_URL}/api/1.0/Patient/${patient.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...rest }),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    }
};

export const newPatient = async (patient: Patient): Promise<any> => {
    const token = localStorage.getItem("token");
    const apiPatient = patientLocalToApi([patient])[0];

    const response = await fetch(`${BASE_URL}/api/1.0/Patient/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiPatient),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    }
};

export const deletePatient = async (patientId: number): Promise<any> => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/1.0/Patient/${patientId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    }
};
