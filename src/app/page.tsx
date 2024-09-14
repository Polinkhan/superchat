import Link from "next/link";
import Login from "./login/page";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-full bg-slate-300 flex items-center justify-center">
      <Link href={"login"}>
        <Button>Login now</Button>
      </Link>
    </div>
  );
}
