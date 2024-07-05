"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const HeaderActions = () => {
  return (
    <div>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <div className="flex">
          <UserButton />
        </div>
      </Authenticated>
      <AuthLoading>
        <div>
          <Skeleton className="rounded-full w-[45px] h-[45px] bg-slate-600" />
        </div>
      </AuthLoading>
    </div>
  );
};

export default HeaderActions;
