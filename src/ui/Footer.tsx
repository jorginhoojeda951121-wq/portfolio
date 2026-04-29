"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from '../../public/logo.png'

const date = new Date();
let year = date.getFullYear();

function Footer() {
  return (
    <footer className="w-full pt-5 p-2  bg-slate-100 dark:bg-[#020617] sticky top-[100vh]">
      <div className="mx-auto max-w-7xl items-center lg:justify-between px-4 md:flex lg:px-0 w-11/12 md:w-11/12 lg:w-11/12  xl:container">
        <Link href={"/"}>
          <div className="lg:inline-flex items-center hidden">
            <span className="rounded p-1 pr-0">
              <Image src={Logo} alt='logo' className='w-[50px] h-10' />
            </span>
          </div>
        </Link>
        <div className="md:mt-0 text-center lg:space-y-0 space-y-5">
          <p>
            © {year}
            <a
              href="https://github.com/waterfire-source"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maxwell Carter Github Profile"
            >
              <span className="font-bold text-indigo-500 hover:underline ml-1 mr-1">
                Maxwell Carter.
              </span>
            </a>
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
