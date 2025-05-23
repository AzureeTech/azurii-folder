import React from 'react';
import './Services.css';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import slide4 from '../assets/images/slide4.jpg';
import slide5 from '../assets/images/slide5.jpg';
import slide6 from '../assets/images/slide6.jpg';

const images = [slide1, slide2, slide3, slide4, slide5, slide6];

const Services = () => {
  return (
    <div className="services-section">
      {/* 🔁 Image Carousel */}
      <div className="image-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>

      {/* 🧾 Heading and services */}
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        <div className="service-box">Web Development</div>
        <div className="service-box">KRA Services</div>
        <div className="service-box">Email Setup</div>
        <div className="service-box">Printing & Typing</div>
        <div className="service-box">Business Plans</div>
        <div className="service-box">Website Design</div>
      </div>
    </div>
  );
};

export default Services;
