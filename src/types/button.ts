import { ButtonHTMLAttributes } from "react";

export type ButtonType = Extract<
  ButtonHTMLAttributes<HTMLButtonElement>["type"],
  string | undefined
>;
export type ButtonVariant = "primary" | "secondary";
