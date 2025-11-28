import React from "react";

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  children = null,
  className = "",
  ...props
}) => {
  return (
    <i
      className={`material-symbols-outlined ${className}`}
      {...props}
    >
      {children}
    </i>
  );
}

export default Icon;