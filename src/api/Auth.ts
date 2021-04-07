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
