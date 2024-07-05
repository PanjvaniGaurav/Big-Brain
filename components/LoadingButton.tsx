import React, { MouseEvent } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({
  isLoading,
  children,
  loadingText,
  onClick,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}) => {
  return (
    <div>
      <Button
        type="submit"
        disabled={isLoading}
        onClick={(e) => {
          onClick?.(e);
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2" />
            {loadingText}
          </>
        ) : (
          <>{children}</>
        )}
      </Button>
    </div>
  );
};

export default LoadingButton;
