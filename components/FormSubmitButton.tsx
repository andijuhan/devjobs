"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import LoadingButton from "./LoadingButton";

interface FormSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ ...props }) => {
  const { pending } = useFormStatus();
  return <LoadingButton loading={pending} {...props} />;
};

export default FormSubmitButton;
