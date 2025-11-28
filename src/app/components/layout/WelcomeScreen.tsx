import React, { useEffect, useState } from "react";
import Logo from "@components/common/Logo";

interface WelcomeScreenProps {
    name: string;
    onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("User from localStorage:", user);
        setName(user.name || "Usuário");

        const timer = setTimeout(() => {
            onComplete();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <Logo />
                <h2 className="welcome-message">Bem-vindo, {name}!</h2>
            </div>
        </div>
    );
}

export default WelcomeScreen;