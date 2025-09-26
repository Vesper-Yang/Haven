"use client";

import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import UserMenu from "./UserMenu";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <header className="container mx-auto">
      <nav className="flex py-4 px-4 justify-between items-center">
        <Link
          href={"/"}
          className="flex flex-row gap-1 items-center justify-center hover:bg-brand/10 rounded-sm pr-2 py-1 transition duration-300 ease-in-out"
        >
          <Image
            width={128}
            height={128}
            src="/logo.png"
            alt="logo"
            className="w-10 h-10"
            priority
          />
          <p className="text-sm font-bold text-brand">Haven</p>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
