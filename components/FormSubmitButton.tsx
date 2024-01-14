"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface FormSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ ...props }) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} className={cn("flex items-center justify-center gap-2", props.className)} disabled={props.disabled || pending}>
      {props.children}
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
    </Button>
  );
};

export default FormSubmitButton;
