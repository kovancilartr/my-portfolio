import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-row bgOne textOne">
        <div className="bg-[url('/img/2.png')] bg-cover bg-center bg-opacity-80 w-1/2">
          <div className="bg-black bg-opacity-40 w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-pacifico text-white">Giriş Yap</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
