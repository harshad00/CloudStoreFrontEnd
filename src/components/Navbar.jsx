import React from 'react';
import { Cloud } from 'lucide-react';
import { Button } from './common';
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../hooks/useAuth';


function Navbar() {
   const { user , setUser} = useAuth();
  console.log(user);
  
   const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };
    const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include", // important so cookie gets sent
      });
      const data = await res.json();
      console.log(data.message);
      setUser(null); // clear user state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
 
  return (
    <div className='p-3 mx-3 flex items-center justify-between'>
      {/* Use Tailwind text color instead of hardcoded color */}
      <div className='flex items-center'>
      <Cloud size={50} className='text-primary' />
      <div className='text-3xl font-bold text-primary ml-2'>
        CloudStore
        </div>
      </div>
       
      <div>
        <div> HOME</div>
      </div>

      {!user ? ( <div className=' ' >
        <Button name="Login with Google" onClick={handleGoogleLogin} variant="border" icon={FcGoogle} size="ms" className='px-3 py-1' />
      </div>) : (<div className='flex items-center'>
          <h3 className='px-2'>{ user?.username}</h3>
          <img src={user?.image} alt="User Avatar" className='w-10 h-10 border-2 border-primary rounded-full mr-2 ' />
          <Button name="Logout" onClick={handleLogout} variant="border"  size="ms" className='px-3 py-1 bg-red-400 text-center ' />
      </div>)
        }
     
    </div>
  );
}

export default Navbar;
