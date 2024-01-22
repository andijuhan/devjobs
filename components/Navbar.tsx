import logo from "@/assets/code.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="border-b bg-gray-50 shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="cyber jobs logo" width={40} />
          <span className="text-xl font-bold tracking-tight ">DevJobs</span>
        </Link>
        <Button asChild variant="outline" className="font-semibold">
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
