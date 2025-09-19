"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const CollectionLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const handleRouterBack = () => {
    router.back();
  };

  return (
    <div>
      <Button className="mb-10" onClick={handleRouterBack}>
        Back
      </Button>
      <Suspense fallback={<BarLoader color="orange" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
};

export default CollectionLayout;
