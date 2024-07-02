"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import React from "react";

const HeaderActions = () => {
  return (
    <div>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <div className="text-4xl">
        <UserButton />
        </div>
      </Authenticated>
      <AuthLoading>
        <div>Loading...</div>
      </AuthLoading>
    </div>
  );
};

export default HeaderActions;
