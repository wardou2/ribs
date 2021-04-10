import React, { useState } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";

interface LoginProps {
    handleSignIn: (email: string, password: string, remember: boolean) => void;
}

const Login = ({ handleSignIn }: LoginProps) => {
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (
        email: string,
        password: string,
        remember: boolean
    ) => {
        handleSignIn(email, password, remember);
    };

    return (
        <Form onSubmit={() => handleSubmit(email, password, remember)}>
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
            <Button type="submit">Sign in</Button>
        </Form>
    );
};

export default Login;
