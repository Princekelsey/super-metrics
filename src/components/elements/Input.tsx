import React from "react";
import FormLabel from "./FormLabel";
import { inputTypes, formStatus } from "../../types";
import classNames from "classnames";
import FormHint from "./FormHint";

interface InputProps {
  label?: string;
  labelHidden?: boolean;
  type: inputTypes;
  name?: string;
  status?: formStatus;
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  className?: string;
  hint?: string;
  [x: string]: any;
}

const Input: React.FC<InputProps> = ({
  label,
  labelHidden,
  type,
  name,
  className,
  status,
  disabled,
  value,
  placeholder,
  hint,
  children,
  ...props
}) => {
  const classes = classNames("form-input", className);

  return (
    <React.Fragment>
      {label && (
        <FormLabel labelHidden={labelHidden} id={props.id}>
          {label}
        </FormLabel>
      )}
      <div className="input-conatner">
        <input
          {...props}
          type={type !== "textarea" ? type : undefined}
          className={classes}
          name={name}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
        />
      </div>
      {hint && <FormHint status={status}>{hint}</FormHint>}
    </React.Fragment>
  );
};

export default Input;
