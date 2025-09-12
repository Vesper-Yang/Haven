import React from "react";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="container mx-auto">{children}</div>;
};

export default HomeLayout;
