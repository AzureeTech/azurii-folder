// src/components/Contacts.js
import React from "react";

function Contacts() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-md">
        <p className="mb-4">You can reach us through the following ways:</p>
        <ul className="mb-6 space-y-2">
          <li><strong>Phone:</strong> 0794446838 / 0758306691</li>
          <li><strong>Email:</strong> azurii.cyber@gmail.com</li>
          <li><strong>Location:</strong> Nairobi, Kenya</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4">Feedback / Message Form</h3>
        <form
          action="https://formspree.io/f/mldblbng"  // 👈 Replace with your real ID
          method="POST"
          className="space-y-4"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <select
            name="service"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select a Service</option> 
            <option value="Typing">KRA PIN Registration/Retrieval</option>
            <option value="Typing">KRA Returns,Amended & Withholding Certificate Filling</option>
            <option value="KRA">NTSA Services</option>
            <option value="Typing">Mass Typing</option>
            <option value="Website">Business Plans</option>
            <option value="KRA">Website Development/Portfolio Design</option>
            <option value="Typing">CV Writing and Tailoring(Europeans Formats included)</option>
            <option value="Website">Graphic Design(Business cards, Wedding card etc)</option>
            <option value="KRA">Document Editing and Proofreading</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message or Feedback"
            required
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacts;
