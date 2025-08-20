// src/components/Paybill.js
import React from "react";

function Paybill() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">How to Make Payment</h2>
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
        <p className="mb-4">You can make payments via M-Pesa:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Go to M-Pesa</li>
          <li>Select <strong>Send Money</strong></li>
          <li>Enter Phone Number: <span className="font-semibold">0794446838</span></li>
          <li>Confirm Account Name: <span className="font-semibold">Azuree World</span></li>
          <li>Enter the Amount</li>
          <li>Enter your M-Pesa PIN and press OK</li>
        </ul>
        <p className="mt-4 text-green-400 font-medium">You will receive a confirmation SMS shortly after.</p>
      </div>
    </div>
  );
}

export default Paybill;
