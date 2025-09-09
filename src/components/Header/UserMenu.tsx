"use client";

import { UserButton } from "@clerk/nextjs";
import { Home } from "lucide-react";
import React from "react";

const UserMenu = () => {
  return (
    <UserButton showName={true}>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Home"
          labelIcon={<Home size={16} />}
          href="/home"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;
