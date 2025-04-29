import React from "react";
import $ from "./ErrorMessage.module.css";

interface IErrorMessageProps {
  errorMsg: string;
}

const ErrorMessage = ({ errorMsg }: IErrorMessageProps) => {
  return <div className={$.error}>{errorMsg}</div>;
};

export default ErrorMessage;
