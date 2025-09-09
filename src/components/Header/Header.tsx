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
      <nav className="flex py-6 px-4 justify-between items-center">
        <Link href={"/"}>
          <Image
            width={100}
            height={100}
            src="/next.svg"
            alt="logo"
            className="h-5 w-auto object-contain"
            priority
          />
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
