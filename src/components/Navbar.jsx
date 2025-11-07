import React, { useState } from 'react';
import { Cloud, Menu, X } from 'lucide-react';
import { Button } from './common';
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, setUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = "https://cloudstorebackend-i2n1.onrender.com/auth/google";
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("https://cloudstorebackend-i2n1.onrender.com/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.message);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='p-3 mx-3 flex items-center justify-between relative'>
      {/* 🌩 Logo */}
      <div className='flex items-center'>
        <Cloud size={50} className='text-primary' />
        <div className='text-2xl md:text-3xl font-bold text-primary ml-2'>
          CloudStore
        </div>
      </div>

      {/* 💻 Desktop Navigation */}
      <div className='hidden md:flex items-center space-x-6'>
        <Link
          to="/"
          className='text-lg font-medium text-foreground hover:text-primary transition'
        >
          HOME
        </Link>

        {user && (
          <Link
            to="/media"
            className="text-lg font-semibold text-primary border border-primary/40 rounded-lg px-4 py-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            MEDIA
          </Link>
        )}

        {!user ? (
          <Button
            name="Login with Google"
            onClick={handleGoogleLogin}
            variant="border"
            icon={FcGoogle}
            size="ms"
            className='px-3 py-1'
          />
        ) : (
          <div className='flex items-center space-x-3'>
            <h3 className='px-2 text-sm md:text-base'>{user?.username}</h3>
            <img
              src={user?.image}
              alt="User Avatar"
              className='w-8 h-8 md:w-10 md:h-10 border-2 border-primary rounded-full'
            />
            <Button
              name="Logout"
              onClick={handleLogout}
              variant="border"
              size="ms"
              className='px-2 py-1 md:px-3 md:py-1 bg-red-400 text-center text-xs md:text-sm'
            />
          </div>
        )}
      </div>

      {/* 📱 Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className='md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 📋 Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50'>
          <div className='flex flex-col space-y-4 p-4'>
            <Link
              to="/"
              className='text-lg font-medium text-center text-foreground hover:text-primary transition'
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>

            {user && (
              <Link
                to="/media"
                className="text-lg font-semibold text-center border border-primary/40 rounded-lg px-4 py-2 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                MEDIA
              </Link>
            )}

            {!user ? (
              <Button
                name="Login with Google"
                onClick={handleGoogleLogin}
                variant="border"
                icon={FcGoogle}
                size="ms"
                className='w-full px-3 py-2'
              />
            ) : (
              <div className='flex flex-col items-center space-y-3'>
                <div className='flex items-center space-x-2'>
                  <img
                    src={user?.image}
                    alt="User Avatar"
                    className='w-10 h-10 border-2 border-primary rounded-full'
                  />
                  <h3 className='text-base'>{user?.username}</h3>
                </div>
                <Button
                  name="Logout"
                  onClick={handleLogout}
                  variant="border"
                  size="ms"
                  className='w-full px-3 py-2 bg-red-400 text-center'
                />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
