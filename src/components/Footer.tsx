import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] py-15">
      <div className="container grid grid-cols-4 items-center text-sm">
        <div className="text-gray-500">
          Agricultural Products Rural
          Entrepreneurship Management System:
          AgriProduct Hub
        </div>
        <div>
          <ul className="text-white">
            My Account
            <li className="mt-5 text-sm text-gray-500">
              Order History
            </li>
          </ul>
          <ul className="mt-3 text-white">
            Shoping Cart
            <li className="mt-5 text-sm text-gray-500">
              Wishlist
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-white">
            Helps
            <li className="mt-5 text-sm text-gray-500">
              Faqs
            </li>
            <li className="mt-5 text-sm text-gray-500">
              Terms & Condition
            </li>
            <li className="mt-5 text-sm text-gray-500">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <ul className="text-white">
            Contact
            <li className="mt-5 text-sm text-gray-500">
              Phone: XXXXXXXXXX
            </li>
            <li className="mt-5 text-sm text-gray-500">
              Email: digitalconnect@gmail.com
            </li>
            <li className="mt-5 text-sm text-gray-500">
              Website: Digital X
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
