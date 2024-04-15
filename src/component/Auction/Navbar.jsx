/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, X } from "lucide-react";
import { useState } from "react";
// import logo from "../../assets/logo.jpeg";
import auction from "../../assets/auction.jpeg";
import SignUp from "./SignUp";
import Login from "./Login";

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleSignUpPage = () => {
    setShowSignUpPage(!showSignUpPage);
  };

  const toggleLoginPage = () => {
    setShowLoginPage(!showLoginPage);
  };

  return (
    <nav className="stick top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-16 w-16 mr-2" src={auction} alt="auction" />
            <h1 className="text-5xl tracking-tight">
              Logitrust
              <span className="font-bold bg-gradient-to-r from-yellow-500 to-red-600 text-transparent bg-clip-text">
                {" "}
                AUCTION
              </span>
            </h1>
          </div>
          <div className="hidden lg:flex justif space-x-2 items-center">
            <a
              href="#"
              className="py-2 px-3 border rounded-md"
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
      </div>
      {showSignUpPage && <SignUp />}
      {showLoginPage && <Login />}
    </nav>
  );
};
export default Navbar;
