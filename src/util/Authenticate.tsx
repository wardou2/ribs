import React, { useState, createContext, useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";

import { getToken, getCurrentUser } from "../api/Auth";
import { User, AuthLevel } from "../interfaces";
import useToken from "./useToken";

const authContext = createContext<any>({});

export function ProvideAuth({ children }: any) {
    let auth = useProvideAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const { clearToken, setToken } = useToken();
    // Users are undefined when waiting for initial API response and false for logged out
    const [user, setUser] = useState<User | false | undefined>(undefined);
    const [authLevel, setAuthLevel] = useState<AuthLevel>("");

    const handleSignIn = async (
        email: string,
        password: string,
        remember: boolean,
        cb: () => any
    ) => {
        const res = await getToken(email, password);
        setToken(res.access_token);
        const user = await getCurrentUser();
        setUser(user);
        cb();
    };

    const handleSignOut = (cb: () => any) => {
        clearToken();
        setUser(false);
        cb();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) setUser(false);

        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
            } catch (e) {
                // TODO: Better error handling
                // alert(e);
            }
        };
        fetchUser();
    }, [setUser]);

    // Set auth levels when user is updated
    useEffect(() => {
        setAuthLevel(() => {
            if (!user) return "";

            let currHighestAuth = "";
            for (let i = 0; i < user.roles.length; i += 1) {
                const role = user.roles[i];
                if (role.name === "Administrator") {
                    return "Administrator";
                } else if (role.name === "Clinician") {
                    currHighestAuth = "Clinician";
                }
            }
            return currHighestAuth as AuthLevel;
        });
    }, [user, setAuthLevel]);

    return {
        user,
        authLevel,
        handleSignIn,
        handleSignOut,
    };
}

export function PrivateRoute({ children, ...rest }: any) {
    let auth = useAuth();

    if (auth.user === undefined) return <div>...loading</div>;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                )
            }
        />
    );
}
