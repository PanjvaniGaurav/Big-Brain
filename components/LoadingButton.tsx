import React, { MouseEvent } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({
  isLoading,
  children,
  loadingText,
  onClick,
  className,
  ...props
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          <span className="truncate">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;