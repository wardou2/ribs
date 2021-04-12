import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Checkbox, Button, Message } from "semantic-ui-react";

import { useAuth } from "../util/Authenticate";
import { LocationState } from "../interfaces";

const Login = () => {
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();
    let location = useLocation();
    const auth = useAuth();

    let { from } = (location.state as LocationState) || {
        from: { pathname: "/" },
    };

    const handleSubmit = async (
        email: string,
        password: string,
        remember: boolean
    ) => {
        try {
            await auth.handleSignIn(email, password, remember, () => {
                history.replace(from);
            });
        } catch (e) {
            setError(e.message);
        }
    };

    const isInvalid = () => {
        return email.length === 0 || password.length === 0;
    };

    return (
        <div className="login">
            <div className="login__logo">VT</div>
            <Form
                onSubmit={() => handleSubmit(email, password, remember)}
                className="login__form"
                error={error.length > 0}
            >
                <Form.Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Field>
                    <Checkbox
                        label="Remember Me"
                        checked={remember}
                        onClick={() => setRemember(!remember)}
                    />
                </Form.Field>
                <Button type="submit" disabled={isInvalid()}>
                    Sign in
                </Button>
                <Message error content={error} />
            </Form>
        </div>
    );
};

export default Login;
