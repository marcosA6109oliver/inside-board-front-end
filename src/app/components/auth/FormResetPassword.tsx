import React, { useState } from "react";
import Text from "@components/common/Text";
import Input from "@components/common/Input";
import Button from "@components/common/Button";

interface PropsResetPasswordForm {
    onSubmit?: (token: string, password: string) => void;
    onBackLogin?: () => void;
}

const FormResetPassword: React.FC<PropsResetPasswordForm> = ({ onSubmit, onBackLogin }) => {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleValidation = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!token) {
            newErrors.token = "Por favor, insira o token de redefinição.";
        }

        if (!password) {
            newErrors.password = "Por favor, insira uma nova senha.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            onSubmit?.(token, password);
        }
    };

    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="input-container font-caption-large font-family-helvetica color-primary-white mg-t-16">
                <Text
                    tagType="label"
                    htmlFor="token"
                    className="input-label color-primary-white bg-primary-dark-2"
                >
                    Token
                </Text>
                <Input
                    type="text"
                    id="token"
                    className="token-input"
                    value={token}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
                    aria-invalid={!!errors.token}
                />
                {errors.token && <span className="error-message" role="alert">{errors.token}</span>}
            </div>
            <div className="input-container font-caption-large font-family-helvetica color-primary-white mg-t-16">
                <Text
                    tagType="label"
                    htmlFor="newPassword"
                    className="input-label color-primary-white bg-primary-dark-2"
                >
                    Nova Senha
                </Text>
                <Input
                    type="password"
                    id="newPassword"
                    className="password-input"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                />
                {errors.password && <span className="error-message" role="alert">{errors.password}</span>}
            </div>
            <Button className="pd-x-24 pd-y-12 bg-primary-yellow mg-t-32" type="submit">
                Redefinir Senha
            </Button>
            <div className="mg-t-16 text-start">
                <a href="#" onClick={(e) => { e.preventDefault(); onBackLogin?.(); }} className="forgot-password-link color-primary-white">
                    Voltar ao login
                </a>
            </div>
        </form>
    );
}

export default FormResetPassword;