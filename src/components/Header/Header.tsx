"use client";

import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import UserMenu from "./UserMenu";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="container mx-auto">
      <nav className="flex py-4 px-4 justify-between items-center">
        <Link
          href={"/"}
          className="flex flex-row gap-1 items-center justify-center hover:bg-[#CAE59D40] rounded-sm pr-2 pl-1 py-1 transition duration-300 ease-in-out"
        >
          <Image
            width={128}
            height={128}
            src="/logo.png"
            alt="logo"
            className="w-10 h-10"
            priority
          />
          <p className="text-sm font-bold text-[#71ac11]">Haven</p>
        </Link>
        <div className="flex items-center gap-4">
          <SignedIn>
            {pathname === "/" && (
              <Link href="/home">
                <Button className="flex items-center gap-2" size={"sm"}>
                  <Home size={16} />
                  <span>Go to Home</span>
                </Button>
              </Link>
            )}
            <UserMenu />
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/home">
              <Button variant={"outline"}>Login</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
