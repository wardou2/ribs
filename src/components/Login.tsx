import React, { useState } from "react";
import { Form, Checkbox, Button, Message } from "semantic-ui-react";

interface LoginProps {
    handleSignIn: (email: string, password: string, remember: boolean) => void;
}

const Login = ({ handleSignIn }: LoginProps) => {
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (
        email: string,
        password: string,
        remember: boolean
    ) => {
        try {
            await handleSignIn(email, password, remember);
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
