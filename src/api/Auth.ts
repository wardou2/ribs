import Cookies from "js-cookie";
import { User } from "../interfaces";
import { BASE_URL } from "./constants";

export const getToken = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/Token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=password&username=${username}&password=${password}`,
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};

export const getCurrentUser = async (): Promise<User> => {
    const token = Cookies.get("token");
    const response = await fetch(
        `${BASE_URL}//api/1.0/Security/User/ByCurrentUser`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json().then((json) => json.payload as User);
    }
};
