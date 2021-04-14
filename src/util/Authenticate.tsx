import React, { useState, createContext, useContext, useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router";

import { getToken, getCurrentUser } from "../api/Auth";
import { User, AuthLevel } from "../interfaces";
import useToken from "./useToken";

// Adapted from https://usehooks.com/useAuth/

type ContextProps = {
    user: User | false | undefined;
    authLevel: AuthLevel;
    handleSignIn: (
        email: string,
        password: string,
        remember: boolean,
        cb: () => any
    ) => Promise<void>;
    handleSignOut: (cb: () => any) => void;
};

const authContext = createContext<Partial<ContextProps>>({});

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
    const [authLevel, setAuthLevel] = useState<AuthLevel>(AuthLevel.None);

    const initializeAuthLevel = (user: User) => {
        setAuthLevel(() => {
            if (!user) return AuthLevel.None;

            let currHighestAuth = AuthLevel.None;
            for (let i = 0; i < user.roles.length; i += 1) {
                const role = user.roles[i];
                if (role.name === "Administrator") {
                    return AuthLevel.Administrator;
                } else if (role.name === "Clinician") {
                    currHighestAuth = AuthLevel.Clinician;
                }
            }
            return currHighestAuth;
        });
    };

    //TODO: wire up remember, maybe use sessionStorage
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
        initializeAuthLevel(user);
        cb();
    };

    const handleSignOut = (cb: () => any) => {
        clearToken();
        setUser(false);
        cb();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(false);
            return;
        }

        const fetchUser = async () => {
            const user = await getCurrentUser();
            setUser(user);
            initializeAuthLevel(user);
        };

        fetchUser();
    }, []);

    return {
        user,
        authLevel,
        handleSignIn,
        handleSignOut,
    };
}

interface PrivateRouteProps extends RouteProps {
    children: any;
    requiredAuthLevel: AuthLevel;
}

export function PrivateRoute({
    children,
    requiredAuthLevel,
    ...rest
}: PrivateRouteProps) {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                const { user, authLevel } = auth;
                if (user === undefined) return <div>...loading</div>;
                if (!user)
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    );
                if (authLevel && requiredAuthLevel > authLevel)
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
                        />
                    );
                return children;
            }}
        />
    );
}
