/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, X } from "lucide-react";
import React,{ useState } from "react";
import logo from "../../assets/logo.jpeg";
import { navItems } from "../../constants";
import SignUp from "./SignUp";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleSignUpPage = () => {
    setShowSignUpPage(!showSignUpPage);
  };

  const toggleLoginPage = () => {
    setShowLoginPage(!showLoginPage);
  }

  return (
    <nav className="stick top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
            <span className="text-xl tracking-tight">Logitrust</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label} </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justif space-x-12 items-center">
            <a
              href="#"
              className=" py-2 px-3 border border-blue-700 bg-blue-600 rounded-md"
              onClick={() => {
                navigate("./AuctionLP");
              }}
            >
              AUCTION
            </a>
            <a href="#" className="py-2 px-3 border rounded-md"
              onClick={toggleLoginPage}
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              onClick={toggleSignUpPage}
            >
              Sign Up
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a
                href="#"
                className="py-2 px-3 border rounded-md"
                onClick={() => {
                  navigate("./AuctionLP");
                }}
              >
                AUCTION
              </a>
              <a href="#" className="py-2 px-3 boder rounded-md"
                onClick={toggleLoginPage}
              >
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                onClick={toggleSignUpPage}
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </div>
      {showSignUpPage && <SignUp />}
      {showLoginPage && <Login />}
    </nav>
  );
};
export default Navbar;
