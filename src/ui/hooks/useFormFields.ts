import { useState } from "react";

export default function useFormFields<T>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
 
  const resetForm = () => {
    setFormState(initialState);
  };

  return { formState, handleChange, resetForm, setFormState };
}
