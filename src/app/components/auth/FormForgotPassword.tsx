import React, { useState } from "react";
import Text from "@components/common/Text";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import AlertMessage from "@components/common/AlertMessage";

interface PropsForgotPasswordForm {
    onSubmit?: (email: string) => void;
    onBackLogin?: () => void;
}

const FormForgotPassword: React.FC<PropsForgotPasswordForm> = ({ onSubmit, onBackLogin }) => {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info');

    const handleValidation = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            newErrors.email = "Por favor, insira um e-mail válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                onSubmit?.(email);
                setAlertMessage("Email de recuperação enviado com sucesso!");
                setAlertType("success");
            } catch (error) {
                setAlertMessage("Erro ao enviar email de recuperação.");
                setAlertType("error");
            }
        } else {
            setAlertMessage("Erro: E-mail inválido.");
            setAlertType("error");
        }
    };

    return (
        <>
            {alertMessage && (
                <AlertMessage
                    message={alertMessage}
                    type={alertType}
                    onDismiss={() => setAlertMessage(null)}
                />
            )}

            <form role="form" onSubmit={handleSubmit}>
                <div className="input-container font-caption-large font-family-helvetica color-primary-white mg-t-16">
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
                <Button className="pd-x-24 pd-y-12 bg-primary-yellow mg-t-32" type="submit">
                    Enviar E-mail
                </Button>
                <div className="mg-t-16 text-start">
                    <a href="#" onClick={(e) => { e.preventDefault(); onBackLogin?.(); }} className="forgot-password-link color-primary-white">
                        Voltar ao login
                    </a>
                </div>
            </form>
        </>
    );
}

export default FormForgotPassword;