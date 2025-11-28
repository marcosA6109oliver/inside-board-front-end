import React, { useEffect, useState } from "react";

interface AlertMessageProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onDismiss?: () => void;
    duration?: number;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type, onDismiss, duration = 3000 }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);

        const timer = setTimeout(() => {
            setActive(false);
            const fadeOutTimer = setTimeout(() => {
                if (onDismiss) {
                    onDismiss();
                }
            }, 500);

            return () => clearTimeout(fadeOutTimer);
        }, duration);

        return () => clearTimeout(timer);
    }, [onDismiss, duration]);

    const getAlertClass = () => {
        switch (type) {
            case 'success':
                return 'alert-success';
            case 'error':
                return 'alert-error';
            case 'info':
                return 'alert-info';
            default:
                return '';
        }
    };

    return (
        <div
            className={`alert-message ${active ? "alert-active" : ""} ${getAlertClass()}`}
        >
            {message}
        </div>
    );
};

export default AlertMessage;