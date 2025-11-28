import React from "react";
import Icon from "@components/common/Icon";

interface IconConfig {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    className?: string;
    options: Option[];
    placeholder?: string;
    leftIcon?: IconConfig;
    rightIcon?: IconConfig;
    [key: string]: any;
}

const Select: React.FC<SelectProps> = ({
    className = "",
    options,
    placeholder = "Escolha uma opção",
    leftIcon,
    rightIcon,
    ...props
}) => {
    return (
        <div className={`input-wrapper ${className}`}>
            {leftIcon && (
                <Icon className={leftIcon.className}>
                    {leftIcon.children}
                </Icon>
            )}
            <select className={`${className} styledSelect`} defaultValue="default" {...props}>
                <option value="default" disabled hidden>
                    {placeholder}
                </option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {rightIcon && (

                <Icon className={rightIcon.className}>
                    {rightIcon.children}
                </Icon>

            )}
        </div>
    );
};

export default Select;