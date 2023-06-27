import React from "react";
import Logo from "../../assets/logo-black.png";
const Dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center place-items-center flex-1 bg-[#f4f4f4]">
      <div className="w-[900px] md:w-[800px] sm:w-full xs:w-full bg-red-500 min-h-[700px] rounded-md">
        <header className="flex justify-between place-items-center p-5 bg-white">
          <div>
            <img src={Logo} className="w-16" />
          </div>
          <div>
            <h1>Welcome User</h1>
          </div>
        </header>
        <main>
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
