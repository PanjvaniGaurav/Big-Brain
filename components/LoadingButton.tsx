import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({
  isLoading,
  children,
  loadingText,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText: string;
}) => {
  return (
    <div>
      <Button type="submit" disabled={isLoading}>
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
