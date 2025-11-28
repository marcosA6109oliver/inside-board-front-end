import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import Icon from "@components/common/Icon";

interface IconConfig {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

interface InputProps {
    className?: string;
    leftIcon?: IconConfig;
    rightIcon?: IconConfig;
    placeholder?: string;
    isDateInput?: boolean;
    [key: string]: any;
}

const Input: React.FC<InputProps> = ({
    className = "",
    leftIcon,
    rightIcon,
    placeholder,
    isDateInput = false,
    ...props
}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const datePickerRef = useRef<any>(null);

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleClearDate = () => {
        setStartDate(null);
    };

    const handleIconClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };

    return (
        <div className={`input-wrapper ${className}`}>
            {leftIcon && !isDateInput && (
                <Icon className={leftIcon.className} onClick={leftIcon.onClick}>
                    {leftIcon.children}
                </Icon>
            )}
            {isDateInput ? (
                <>
                    <Icon
                        className="cursor-pointer color-primary-gray-dark"
                        onClick={handleIconClick}
                    >
                        calendar_month
                    </Icon>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        placeholderText={placeholder}
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        ref={datePickerRef}
                        customInput={
                            <input
                                type="text"
                                className={`${className} input-icon`}
                                onFocus={() => datePickerRef.current?.setOpen(true)}
                                {...props}
                            />
                        }
                    />
                    <button
                        className="clearDate btn pd-4 corner-4 bg-feedback-red color-primary-white font-small mg-r-6"
                        onClick={handleClearDate}
                        style={{ display: startDate ? "block" : "none" }}
                    >
                        <Icon>close</Icon>
                    </button>
                </>
            ) : (
                <input className={`${className}`} placeholder={placeholder} {...props} />
            )}
            {rightIcon && (
                <span onClick={rightIcon.onClick}>
                    <Icon className={rightIcon.className}>
                        {rightIcon.children}
                    </Icon>
                </span>
            )}
        </div>
    );
};

export default Input;