import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthScreenContainer } from "./auth-screen-container";
import Link from "next/link";

export const AuthSignIn = () => {
  return (
    <AuthScreenContainer>
      <Card className="h-full w-full p-4">
        <CardHeader>
          <CardTitle>Login to continue</CardTitle>
          <CardDescription>Use your email or other service to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-2.5">
            <Input value={""} type="email" placeholder="Email" />
            <Input value={""} type="password" placeholder="Password" />
            <Button className="w-full" size="lg" disabled={false}>
              Continue
            </Button>
          </form>

          <Separator />

          <Button className="w-full relative" variant="outline" size="lg" disabled={false}>
            Continue with Google
            <FcGoogle className="absolute size-5 top-1/4 left-3 " />
          </Button>

          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href={"register"}>
              <span className="text-sky-700 cursor-pointer">Sing Up</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthScreenContainer>
  );
};
