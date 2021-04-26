import React from "react";

interface ErrorAlertProps {
  [x: string]: any;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ children, ...props }) => {
  return (
    <div className="alert alert-danger" {...props}>
      {children}
    </div>
  );
};

export default ErrorAlert;
