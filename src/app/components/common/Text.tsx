import React from "react";

type propText = {
    tagType: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
    children?: React.ReactNode;
    className?: string | null;
    htmlFor?: string | null;
    onClick?: () => void;
}

const Text: React.FC<propText> = ({ tagType, children = null, className, htmlFor, ...props }) => {
    const additionalProps = tagType === "label" ? { htmlFor } : {};

    return React.createElement(
        tagType,
        {
            className,
            ...additionalProps,
            ...props,
        },
        children
    );
}

export default Text;