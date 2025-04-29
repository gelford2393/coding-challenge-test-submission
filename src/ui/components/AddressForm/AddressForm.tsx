import React from "react";

import Form from "../Form/Form";
import Radio from "../Radio/Radio";
import Address from "../Address/Address";
import { Address as TAddress } from "../../../types/address";

interface IAddressFormProps {
  loading: boolean;
  addresses: TAddress[];
  postCode: string;
  houseNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddressForm({
  loading,
  addresses,
  postCode,
  houseNumber,
  onChange,
  onSelectedChange,
  onSubmit,
}: IAddressFormProps) {
  return (
    <>
      <Form
        label="🏠 Find an address"
        loading={loading}
        submitText="Find"
        onFormSubmit={onSubmit}
        formEntries={[
          {
            name: "postCode",
            placeholder: "Post Code",
            value: postCode,
            extraProps: { onChange },
          },
          {
            name: "houseNumber",
            placeholder: "House number",
            value: houseNumber,
            extraProps: { onChange },
          },
        ]}
      />

      {addresses.map((address) => (
        <Radio
          name="selectedAddress"
          id={address.id}
          key={address.id}
          onChange={onSelectedChange}
        >
          <Address {...address} />
        </Radio>
      ))}
    </>
  );
}
