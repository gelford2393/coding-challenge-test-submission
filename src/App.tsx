import React from "react";

import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";

import useFormFields from "@/hooks/useFormFields";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import useFetchAddresses from "@/hooks/useFetchAddresses";
import AddressForm from "@/components/AddressForm/AddressForm";
import PersonForm from "@/components/PersonForm/PersonForm";

function App() {
  const { formState, handleChange, resetForm, setFormState } = useFormFields({
    postCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });

  const { postCode, houseNumber, firstName, lastName, selectedAddress } =
    formState;

  const {
    addresses,
    apiError,
    isFetching: isFetchingAddress,
    fetchAddresses,
    setApiError,
    setAddresses,
  } = useFetchAddresses();

  const [error, setError] = React.useState<undefined | string>(undefined);

  const { addAddress, loading } = useAddressBook();

  const handleSelectedAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      ...formState,
      selectedAddress: e.target.value,
    });
  };

  const handleClearAll = () => {
    resetForm();
    setAddresses([]);
    setApiError("");
  };

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAddresses(postCode, houseNumber);
  };

  const handlePersonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setError("First name and last name fields are mandatory!");
      return;
    }

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName, lastName });
    setError("");
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>

        <AddressForm
          loading={isFetchingAddress}
          addresses={addresses}
          postCode={postCode}
          houseNumber={houseNumber}
          onChange={handleChange}
          onSelectedChange={handleSelectedAddressChange}
          onSubmit={handleAddressSubmit}
        />
        {selectedAddress && (
          <PersonForm
            loading={loading}
            firstName={firstName}
            lastName={lastName}
            onChange={handleChange}
            onSubmit={handlePersonSubmit}
          />
        )}

        {(error || apiError) && (
          <ErrorMessage errorMsg={(error || apiError) as string} />
        )}

        <Button onClick={handleClearAll} variant="secondary">
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
