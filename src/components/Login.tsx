import React, { useState } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";

type LoginProps = {
    handleSubmit: (email: string, password: string) => void;
};

const Login = ({ handleSubmit }: LoginProps) => {
    const [remember, setRemember] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form onSubmit={() => handleSubmit(email, password)}>
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
            <Button type="submit" />
        </Form>
    );
};

export default Login;
