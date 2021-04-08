import Cookies from "js-cookie";
import { Patient } from "../interfaces";

import { BASE_URL } from "./constants";

export const getPatients = async (): Promise<Patient[]> => {
    const token = Cookies.get("token");
    //TODO: Error handle
    // if (!token) return;

    const response = await fetch(`${BASE_URL}/api/1.0/Patient`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json().then((json) => json.payload as Patient[]);
    }
};

export const getPatient = async (patientId: number): Promise<Patient> => {
    const token = Cookies.get("token");
    //TODO: Error handle
    // if (!token) return;

    const response = await fetch(`${BASE_URL}/api/1.0/Patient/${patientId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json().then((json) => json.payload as Patient);
    }
};
