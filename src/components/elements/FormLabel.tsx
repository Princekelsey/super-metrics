import React from "react";
import classNames from "classnames";

interface FormLabelProps {
  labelHidden?: boolean;
  id?: string;
  className?: string;
  [x: string]: any;
}

const FormLabel: React.FC<FormLabelProps> = ({
  labelHidden,
  id,
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "form-label",
    labelHidden && "screen-reader",
    className
  );

  return (
    <label {...props} className={classes} htmlFor={id}>
      {children}
    </label>
  );
};

export default FormLabel;
