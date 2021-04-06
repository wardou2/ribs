const BASE_URL = "https://demo3.ribs.vthera.com";

export const getToken = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/Token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=password&username=${username}&password=${password}`,
    });

    if (!response.ok) {
        const json = await response.json();
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};
