"use client";
import { useState, useEffect } from "react";
import { getContacts, Contact } from "@/lib/data-manager";
import { contactEvents } from "@/lib/contact-events";

const DashboardStats = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const refreshContacts = async () => {
    try {
      const contactsData = await getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error('Error refreshing contacts:', error);
    }
  };

  useEffect(() => {
    refreshContacts();
    const unsubscribe = contactEvents.subscribe(refreshContacts);
    return unsubscribe;
  }, []);

  const totalContacts = contacts.length;
  const newContacts = contacts.filter((contact) => contact.status === "new").length;
  const readContacts = contacts.filter((contact) => contact.status === "read").length;
  const repliedContacts = contacts.filter((contact) => contact.status === "replied").length;

  return (
    <div className=" ">
      <div className="grid gap-4 lg:gap-x-8 md:grid-cols-4 mt-5 ">
        <div className="relative p-6 rounded-2xl bg-white/30 shadow dark:bg-slate-900">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-500 dark:text-slate-400">
              <span>Total Contacts</span>
              <svg
                className="w-4 h-4 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div className="text-3xl dark:text-slate-100">{totalContacts}</div>
          </div>
        </div>
        <div className="relative p-6 rounded-2xl bg-white/30 shadow dark:bg-slate-900">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-500 dark:text-slate-400">
              <span>New Messages</span>
              <svg
                className="w-4 h-4 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl dark:text-slate-100">{newContacts}</div>
          </div>
        </div>
        <div className="relative p-6 rounded-2xl bg-white/30 shadow dark:bg-slate-900">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-500 dark:text-slate-400">
              <span>Read Messages</span>
              <svg
                className="w-4 h-4 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl dark:text-slate-100">{readContacts}</div>
          </div>
        </div>
        <div className="relative p-6 rounded-2xl bg-white/30 shadow dark:bg-slate-900">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-500 dark:text-slate-400">
              <span>Replied Messages</span>
              <svg
                className="w-4 h-4 text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-3xl dark:text-slate-100">{repliedContacts}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
