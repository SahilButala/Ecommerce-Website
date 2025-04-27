import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div>
      <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 border-t  ">
        <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <img src={logo} className="h-20" alt="Flowbite Logo" 
             onClick={()=>navigate('/shop/home')}
            />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Shopy™
            </a>
            . All Rights Reserved. 
          </span>
            <ul className="flex flex-wrap items-center mb-6 text-[17px] font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link
                  to={"/shop/products"}
                  className="hover:underline me-4 md:me-6"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to={"/shop/checkout"}
                  className="hover:underline me-4 md:me-6"
                >
                  Checkout
                </Link>
              </li>
              <li>
                <Link
                  to={"/shop/account"}
                  className="hover:underline me-4 md:me-6"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link to={"/shop/search"} className="hover:underline">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
