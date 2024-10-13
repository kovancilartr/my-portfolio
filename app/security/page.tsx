import React from "react";

const SecurityPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bgOne textOne">
      <h1 className="font-roboto text-3xl">
        Üzgünüm ama bu sayfaya erişim izniniz yok.
      </h1>
      <p className="font-roboto text-sm">
        <a href="/">Ana Sayfaya geri dönmek için tıklayın</a>
      </p>
    </div>
  );
};

export default SecurityPage;
