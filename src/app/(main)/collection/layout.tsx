import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const CollectionLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Link href="/home" className="mb-10">
        <Button>Back</Button>
      </Link>
      <Suspense fallback={<BarLoader color="orange" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
};

export default CollectionLayout;
