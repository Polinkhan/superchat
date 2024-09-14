"use client";

import { ReactNode } from "react";

interface AuthScreenProps {
  children: ReactNode;
}

export const AuthScreenContainer = ({ children }: AuthScreenProps) => {
  return (
    <div className="h-full flex items-center justify-center bg-slate-300">
      <div className="md:h-auto md:w-[420px]">{children}</div>
    </div>
  );
};
