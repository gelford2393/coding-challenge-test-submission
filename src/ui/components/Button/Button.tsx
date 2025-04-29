import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";

import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  const buttonClass = `${$.button} ${
    variant === "primary" ? $.primary : $.secondary
  } ${loading ? $.loading : ""}`;
  return (
    <button
      className={buttonClass}
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span className={$.buttonContent}>
          <div data-testid="loading-spinner" className={$.loadingSpinner}></div>
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
