import React, { useState } from 'react';

function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch('https://formspree.io/f/mldblbng', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          form.reset();
          setTimeout(() => setSubmitted(false), 3000); // Show success for 3 sec
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Feedback Form</h2>

      {submitted ? (
        <div className="text-green-600 text-lg font-medium">
          🎉 Thank you! Your feedback has been submitted.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Your Name:
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2 mt-4">
            Email Address:
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2 mt-4">
            Your Feedback:
            <textarea
              name="message"
              required
              className="w-full px-3 py-2 border rounded mt-1"
            ></textarea>
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Feedback
          </button>
        </form>
      )}
    </div>
  );
}

export default Feedback;
