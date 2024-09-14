import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { AuthScreenContainer } from "./auth-screen-container";
import Link from "next/link";

export const AuthSignUp = () => {
  return (
    <AuthScreenContainer>
      <Card className="h-full w-full p-4">
        <CardHeader>
          <CardTitle>Register Now</CardTitle>
          <CardDescription>Use your email or other service to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-2.5">
            <Input value={""} type="email" placeholder="Email" />
            <Input value={""} type="password" placeholder="Password" />
            <Input value={""} type="password" placeholder="Retype Password" />
            <Button className="w-full" size="lg" disabled={false}>
              Continue
            </Button>
          </form>

          <Separator />

          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href={"login"}>
              <span className="text-sky-700 cursor-pointer">Sing In</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthScreenContainer>
  );
};
