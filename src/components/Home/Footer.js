import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0E141A] text-white pt-16 w-full">
      <div className="container mx-auto pb-16">
        <div className="flex flex-col px-12
        sm:flex-row">

          <div className="sm:w-1/3 mx-2 mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-zinc-400">
              DevSage offers a versatile online environment where users can tackle diverse problems using a vast array of over 50 programming languages, empowering coders to hone their skills and adapt to any coding challenge.            </p>
          </div>


          <div className="sm:w-1/3 mx-2 mb-8 md:mb-0 2xl:pl-20 xl:pl-20 ">
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="text-zinc-400">
              <li className="pb-2 ">
                <Link to="/" className='hover:text-[#1AA2D9]'>Home</Link>
              </li>
              <li className="pb-2 ">
                <Link to="/questions" className='hover:text-[#1AA2D9]'>Questions</Link>
              </li>
            </ul>
          </div>

          <div className=' sm:w-1/3 mx-2' >
            <h3 className=" text-lg font-bold mb-4">Contact Us</h3>

            <p className="text-zinc-400 pb-2">
              Phone: +91 8839440345
            </p>
            <p className="text-zinc-400 ">
              Email: aayush05dabral@gmail.com
            </p>
          </div>
        </div>
      </div>


      <div className="bg-[#0E141A] text-center py-4">
        <p>
          &copy; 2023 Aayush Dabral | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;