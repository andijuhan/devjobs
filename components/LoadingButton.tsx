import { ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      className={cn("flex items-center justify-center gap-2", props.className)}
      disabled={props.disabled || loading}
    >
      {children}
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
    </Button>
  );
}
