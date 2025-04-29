import React, { FunctionComponent, InputHTMLAttributes } from "react";

import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import $ from "../../../App.module.css";

interface FormEntry {
  name: string;
  placeholder: string;
  value: string;
  extraProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value">;
}

interface FormProps {
  label: string;
  loading: boolean;
  formEntries: FormEntry[];
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText: string;
}

const Form: FunctionComponent<FormProps> = ({
  label,
  loading,
  formEntries,
  onFormSubmit,
  submitText,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>{label}</legend>
        {formEntries.map(({ name, placeholder, extraProps, value }, index) => (
          <div key={`${name}-${index}`} className={$.formRow}>
            <InputText
              name={name}
              placeholder={placeholder}
              value={(value as string) || ""}
              {...extraProps}
            />
          </div>
        ))}

        <Button loading={loading} type="submit">
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
