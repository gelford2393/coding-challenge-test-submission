// hooks/useFetchAddresses.ts
import { useState } from "react";
import { Address } from "@/types";
import transformAddress, { RawAddressModel } from "src/core/models/address";

export default function useFetchAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [apiError, setApiError] = useState<string | undefined>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchAddresses = async (postCode: string, houseNumber: string) => {
    setIsFetching(true);
    setAddresses([]);
    setApiError(undefined);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
      );

      if (!response.ok) {
        const { errormessage } = await response.json();
        throw new Error(errormessage);
      }

      const { details } = await response.json();
      setAddresses(
        details.map((address: RawAddressModel) => transformAddress(address))
      );
    } catch (err) {
      setApiError((err as Error).message || "An unknown error occurred.");
    } finally {
      setIsFetching(false);
    }
  };

  return {
    addresses,
    apiError,
    isFetching,
    fetchAddresses,
    setApiError,
    setAddresses,
  };
}
