import { User } from "../interfaces";
import { BASE_URL } from "./constants";

export const getToken = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/Token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=password&username=${email}&password=${password}`,
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    } else {
        return body;
    }
};

export const getCurrentUser = async (): Promise<User> => {
    const token = localStorage.getItem("token");
    const response = await fetch(
        `${BASE_URL}//api/1.0/Security/User/ByCurrentUser`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error_description);
    } else {
        return body.payload as User;
    }
};
