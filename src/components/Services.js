import React, { useState, useEffect } from 'react';
import './Services.css';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';

const Services = () => {
  const images = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="services-container">
      {/* Carousel Section */}
      <div className="carousel-wrapper">
        <div 
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        <div className="service-box">
          <h3>Web Design, Web development and Software Development</h3>
          <p>You'll get:-</p>
            <ul>
            <li>🔹 Responsive Portfolios</li>
            <li>🔹 Business, Company and E-Comemrce Sites</li>
            <li>🔹 Custome Websites</li>
            <li>🔹 Software Dev</li>
      
          </ul>
        </div>
        <div className="service-box">
          <h3>KRA Services</h3>
          <p>Including but not limited to:-</p>
            <ul>
            <li>✔️ KRA PIN Registration(For students, business & NGOs)</li>
            <li>✔️ Lost KRA Pin Retrieval</li>
            <li>✔️ KRA Email Change</li>
            <li>✔️ Nil, NGO, Withholding and PAYE Returns</li>
            <li>✔️ Remove Dependants</li>
          </ul>
        </div>
        <div className="service-box">
          <h3>E-Citizen Services</h3>
          <p>Including but not limited to:-</p>
          <ul>
            <li>🎯 Police Clearance Application</li>
            <li>🎯 Birth/Death Certificate Application</li>
            <li>🎯 Driving Licence Application and Renewal</li>
            <li>🎯 PDL Application </li>
            <li>🎯 PSV Drivers Badge Application</li>
            <li>🎯 Business Registration</li>
            <li>🎯Marriage Certificate Application</li>
            <li>🎯 Passport Application</li>
            <li> And so much more---</li>
          </ul>
        </div>
        <div className="service-box">
          <h3>SHIF/SHA Services</h3>
          <p> We offer:-</p>
          <ul>
            <li>✔️ SHA Registration</li>
            <li>✔️ SHA Profile update</li>
            <li>✔️ SHA PIN Retrieval</li>
            <li>✔️ Add Dependants</li>
            <li>✔️ Remove Dependants</li>
          </ul>
        </div>
        <div className="service-box">
          <h3>Mass Printing & Typing</h3>
          <p>Academic Projects, Business, and Personal documents.</p>
          <ul>
            <li>✔️ Quality Prints</li>
            <li>✔️ Bulk Discounts</li>
            <li>✔️ Fast Turnaround</li>
            <li>✔️ Friendly Service</li>
            <li>✔️ Softcopy to Print Available</li>
          </ul>
        </div>
        <div className="service-box">
          <h3>Professional CV Writing & Formatting and Cover Letters</h3>
          <p>At Azurii World, we understand that your CV is your first impression—whether you're applying for a job, internship, scholarship, or professional opportunity. That's why we tailor each CV to reflect your unique strengths, qualifications, and career goals.
              We offer customized CV styles and formats depending on your needs</p>
        </div>
      </div>
    </div>
  );
};

export default Services;