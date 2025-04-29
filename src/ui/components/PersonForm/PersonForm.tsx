import React from "react";
import Form from "@/components/Form/Form";

interface IPersonFormProps {
  loading: boolean;
  firstName: string;
  lastName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PersonForm({
  loading,
  firstName,
  lastName,
  onChange,
  onSubmit,
}: IPersonFormProps) {
  return (
    <Form
      label="✏️ Add personal info to address"
      loading={loading}
      submitText="Add to addressbook"
      onFormSubmit={onSubmit}
      formEntries={[
        {
          name: "firstName",
          placeholder: "First name",
          value: firstName,
          extraProps: { onChange },
        },
        {
          name: "lastName",
          placeholder: "Last name",
          value: lastName,
          extraProps: { onChange },
        },
      ]}
    />
  );
}
