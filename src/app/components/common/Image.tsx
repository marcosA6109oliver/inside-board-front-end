import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> { }

const Image: React.FC<ImageProps> = ({ ...props }) => {
    return (
        <>
            <img {...props} />
        </>
    );
};

export default Image;