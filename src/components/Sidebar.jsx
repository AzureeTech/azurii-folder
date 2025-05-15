import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 focus:outline-none md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button> 
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white shadow-lg w-64 p-4 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block`}>
        <h2 className="text-xl font-bold text-center mb-6">Azurii World</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-orange-500"><a href="#home">🏠 Home</a></li>
            <li className="hover:text-orange-500"><a href="#services">🛠️ Services</a></li>
            <li className="hover:text-orange-500"><a href="#paybill">💳 Paybill</a></li>
            <li className="hover:text-orange-500"><a href="#contacts">📞 Contacts</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}