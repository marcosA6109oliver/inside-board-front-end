import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, forgotPassword, resetPassword } from "@services/authService";
import { setUser } from "../actions/userActions";
import AlertMessage from "@components/common/AlertMessage";
import Loading from "@components/layout/Loading";
import FormLogin from "@components/auth/FormLogin";
import FormForgotPassword from "@components/auth/FormForgotPassword";
import FormResetPassword from "@components/auth/FormResetPassword";
import Image from "@components/common/Image";
import Text from "@components/common/Text";
import { ApiResponse } from "../types/index";

function Auth() {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (userEmail: string, password: string) => {
        setLoading(true);
        try {
            const response: ApiResponse = await login(userEmail, password);

            console.log("API Response:", response);

            if (response.success && response.data) {

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data));
                dispatch(setUser(response.data));
                setAlertMessage(response.message || "Login realizado com sucesso.");
                setAlertType('success');
                navigate("/home");

            } else {

                setAlertMessage(response.message || "Erro ao efetuar o login.");
                setAlertType('error');
            }
        } catch (error) {
            console.error("Erro durante o login:", error);
            setAlertMessage("Erro ao efetuar o login. Tente novamente.");
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (emailInput: string) => {
        setLoading(true);
        try {
            setEmail(emailInput);
            const response: ApiResponse = await forgotPassword(emailInput);

            if (!response.success) {
                setAlertMessage(response.message);
                setAlertType('error');
            } else {
                setShowResetPassword(true);
                setAlertMessage("Email de recuperação enviado com sucesso!");
                setAlertType('success');
            }
        } catch {
            setAlertMessage("Erro ao tentar envio de email de recuperação. Tente novamente.");
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (token: string, newPassword: string) => {
        setLoading(true);
        try {
            const response: ApiResponse = await resetPassword(token, email, newPassword, newPassword);

            if (!response.success) {
                setAlertMessage(response.message);
                setAlertType('error');
            } else {
                setAlertMessage("Senha redefinida com sucesso.");
                setAlertType('success');
                setShowForgotPassword(false);
                setShowResetPassword(false);
            }
        } catch {
            setAlertMessage("Erro ao redefinir a senha. Tente novamente.");
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = () => {
        setShowForgotPassword(!showForgotPassword);
        setShowResetPassword(false);
        setAlertMessage(null);
    };

    return (
        <>
            {alertMessage && <AlertMessage message={alertMessage} type={alertType} onDismiss={() => setAlertMessage(null)} />}
            {loading && <Loading />}
            {!loading && (
                <div className="login">
                    <div className="login-container color-primary-white">
                        <Image
                            src="https://oliverlatinamerica.agency/wp-content/uploads/2022/01/logo.png"
                            alt="Logo Inside Board"
                            width={100}
                            className="img"
                        />
                        <Text tagType="h2" className="font-large mg-t-24 pd-b-16">
                            Acessar o Inside Board
                        </Text>
                        <Text tagType="h3" className="font-size-small text-start">
                            {showForgotPassword
                                ? showResetPassword
                                    ? "Redefinir Senha"
                                    : "Recuperar Senha"
                                : ""}
                        </Text>

                        {showForgotPassword ? (
                            showResetPassword ? (
                                <FormResetPassword onSubmit={handleResetPassword} onBackLogin={toggleForm} />
                            ) : (
                                <FormForgotPassword onSubmit={handleForgotPassword} onBackLogin={toggleForm} />
                            )
                        ) : (
                            <FormLogin onSubmit={handleLogin} onForgotPassword={toggleForm} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Auth;