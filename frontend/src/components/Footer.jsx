import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} CRM Portal. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="" className="hover:underline text-sm">Privacy Policy</a>
          <a href="" className="hover:underline text-sm">Terms of Service</a>
          <a href="" className="hover:underline text-sm">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
