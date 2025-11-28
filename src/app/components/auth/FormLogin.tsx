import React, { useState } from "react";
import Text from "@components/common/Text";
import Input from "@components/common/Input";
import Button from "@components/common/Button";

interface PropsFormLogin {
    onSubmit?: (email: string, password: string) => void;
    onForgotPassword?: () => void;
}

const FormLogin: React.FC<PropsFormLogin> = ({ onSubmit, onForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleValidation = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            newErrors.email = "Por favor, insira um e-mail válido.";
        }

        if (!password) {
            newErrors.password = "Por favor, insira sua senha.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            onSubmit?.(email, password);
        }
    };

    return (
        <form role="form" onSubmit={handleSubmit}>
            <div className="input-container font-caption-large font-family-helvetica color-primary-white">
                <Text
                    tagType="label"
                    htmlFor="email"
                    className="input-label color-primary-white bg-primary-dark-2"
                >
                    E-mail
                </Text>
                <Input
                    type="email"
                    id="email"
                    className="email-input"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email}
                />
                {errors.email && <span className="error-message" role="alert">{errors.email}</span>}
            </div>
            <div className="input-container font-caption-large font-family-helvetica color-primary-white mg-t-16">
                <Text
                    tagType="label"
                    htmlFor="passwordInput"
                    className="input-label color-primary-white bg-primary-dark-2"
                >
                    Senha
                </Text>
                <Input
                    type={showPassword ? "text" : "password"}
                    id="passwordInput"
                    className="password-input"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    aria-invalid={!!errors.password}
                    rightIcon={{
                        children: showPassword ? "visibility" : "visibility_off",
                        className: "material-icons cursor-pointer pd-r-8",
                        onClick: togglePasswordVisibility
                    }}
                />
                {errors.password && <span className="error-message" role="alert">{errors.password}</span>}
            </div>
            <div className="mg-t-16 text-start">
                <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword?.(); }} className="forgot-password-link color-primary-white">
                    Esqueci a senha
                </a>
            </div>
            <Button className="pd-x-24 pd-y-12 bg-primary-yellow mg-t-32" type="submit">
                Entrar
            </Button>
        </form>
    );
}

export default FormLogin;