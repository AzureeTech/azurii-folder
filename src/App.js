import Media from './components/content/media';
import Pages from './components/content/Pages';
import Posts from './components/content/Post';
import AuthValidator from './components/AuthValidator';
import AdminResetPassword from "./components/AdminResetPassword";
import { Navigate } from "react-router-dom";
//import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanel from './components/AdminPanel';
import { ToastContainer } from 'react-toastify';
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import './App.css';
import React from "react";
import Feedback from './components/Feedback';
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contacts";
import Services from "./components/Services";
import Paybill from "./components/Paybill";
import UserManagement from './components/UserManagement';
import logo from "./assets/Azurii Logo.jpg";
import alex from "./assets/alex.png";
import micah from "./assets/micah.jpg";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img src={logo} alt="Azurii Logo" className="w-80 mb-6" />
      <h1 className="text-3xl font-semibold">Azurii World</h1>
      <p className="text-gray-300 mt-2">"Get all your tech and digital needs sorted — right from home! You call, we do the job and deliver — fast, easy, and reliable!"</p>
      
      <div className="mt-8 text-center px-4">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p className="text-gray-300 mt-2">Azurii World is dedicated to providing essential digital services and solutions in a user-friendly and affordable way, ensuring no one is left behind in the digital world.</p>
      </div>

      <div className="mt-8 text-center px-4">
        <h2 className="text-2xl font-bold">Our Vision</h2>
        <p className="text-gray-300 mt-2">To empower communities through accessible digital solutions.</p>
        
        <h2 className="text-2xl font-bold mt-6">Our Mission</h2>
        <p className="text-gray-300 mt-2">Delivering reliable, cost-effective, and user-friendly digital services that improve lives.</p>

        <h2 className="text-2xl font-bold mt-6">Our Values</h2>
        <ul className="text-gray-300 mt-2 list-disc pl-5">
          <li>Innovation</li>
          <li>Customer-centricity</li>
          <li>Integrity</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold">Team</h2>
      <p className="text-gray-300 mt-2">Meet our dedicated staff</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-1 px-10">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={micah} alt="Team Member" className="w-full h-full object-cover" />
              <div className="name">Micah Kaloki</div>
            </div>
            <div className="flip-card-back">
              <p>CEO/Founder</p>
              <p>A dedicated individual at Azurii World, specializing in software and data analytics, customer support, online applications, and document processing. He is passionate about delivering fast, reliable, and user-friendly cyber solutions to clients in the community.</p>
            </div>
          </div>
        </div>

        <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={alex} alt="Team Member" className="w-full h-full object-cover" />
                <div className="name">Alex Kasyoka</div>
              </div>
              <div className="flip-card-back">
                <p>Software Developer</p>
                <p>A software developer expert at Azurii World, with strong skills in web development, graphic design, and customer support. Outside the tech space, he is also a passionate part-time DJ, bringing energy and creativity to both his professional and artistic pursuits.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-black text-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/paybill" element={<Paybill />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin-reset-password" element={<AdminResetPassword />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
           <Route path="/content/posts" element={<Posts />} />
      <Route path="/content/media" element={<Media />} />
      <Route path="/content/pages" element={<Pages />} />

          {/* Protected Admin Routes */}
          <Route element={<AuthValidator />}>
            <Route path="/admin" element={<UserManagement />} />
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="/admin-panel" element={<Navigate to="/admin/dashboard" />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
export default App;