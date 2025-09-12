import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Link href={"/entry/new"}>
        <Button className="rounded-lg">Write new Journal</Button>
      </Link>
      <div>This is Timeline.</div>
    </div>
  );
};

export default Home;
