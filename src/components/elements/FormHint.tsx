import React from "react";
import { formStatus } from "../../types";
import classNames from "classnames";

interface FormHintProps {
  status?: formStatus;
  className?: string;
  [x: string]: any;
}

const FormHint: React.FC<FormHintProps> = ({
  status,
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "form-hint",
    status && `text-color-${status}`,
    className
  );

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default FormHint;
