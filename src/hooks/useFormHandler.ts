import { useState } from "react";
import { FormStateI } from "../types";

const useFormHandler = (initialState: FormStateI) => {
  const [state, setState] = useState<FormStateI>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return {
    ...state,
    handleChange,
  };
};

export default useFormHandler;
