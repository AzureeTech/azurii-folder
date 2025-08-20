import React from 'react';
import logo from "../assets/Azurii Logo.jpg";
import alex from "../assets/alex.png";
import micah from "../assets/micah.jpg";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Your existing home content */}
      <img src={logo} alt="Azurii Logo" className="w-80 mb-6" />
      <h1 className="text-3xl font-semibold">Azurii World</h1>
      {/* ... rest of your home page content ... */}
    </div>
  );
};

export default Home;