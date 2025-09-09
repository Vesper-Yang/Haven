const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex justify-center items-center pt-25">{children} </div>
  );
};

export default AuthLayout;
