"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdContactMail,
  MdDashboard,
  MdManageAccounts,
  MdLogout,
} from "react-icons/md";
import { logoutDashboard } from "@/lib/auth";

const DashboardMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    logoutDashboard();
    router.push("/dashboard/login");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
          <div className="">
            <Image
              width={100}
              height={100}
              src="/myphoto.jpg"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <span className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-slate-200 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden border-b mb-1 dark:border-slate-100/20 border-slate-800/10">
              <MdManageAccounts className="mr-1 text-lg" /> My Account
            </span>
          </MenuItem>
          <MenuItem>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm flex items-center text-gray-700 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-200 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <MdDashboard className="mr-1 text-lg" /> Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/dashboard/contacts"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:hover:bg-slate-800 hover:bg-slate-200 dark:text-slate-200 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              <MdContactMail className="mr-1 text-lg" /> Contacts
            </Link>
          </MenuItem>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          
          <MenuItem>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 data-focus:bg-red-50 data-focus:text-red-600 data-focus:outline-hidden transition-colors duration-200"
            >
              <MdLogout className="mr-1 text-lg" /> Logout
            </button>
          </MenuItem>

        </div>
      </MenuItems>
    </Menu>
  );
};

export default DashboardMenu;
