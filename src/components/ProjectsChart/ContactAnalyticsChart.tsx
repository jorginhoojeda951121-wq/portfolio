"use client";
import { useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { getContacts, Contact } from "@/lib/data-manager";
import { contactEvents } from "@/lib/contact-events";

const ContactAnalyticsChart = () => {
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

  // Generate analytics data based on contact status
  const getAnalyticsData = () => {
    const statusCounts = {
      new: contacts.filter(c => c.status === "new").length,
      read: contacts.filter(c => c.status === "read").length,
      replied: contacts.filter(c => c.status === "replied").length,
    };

    return [
      {
        name: "New",
        count: statusCounts.new,
        color: "#10b981", // green
      },
      {
        name: "Read", 
        count: statusCounts.read,
        color: "#3b82f6", // blue
      },
      {
        name: "Replied",
        count: statusCounts.replied,
        color: "#8b5cf6", // purple
      },
    ];
  };

  const data = getAnalyticsData();

  return (
    <div className="w-full lg:h-64 h-44 lg:my-10">
      <span className="flex float-end text-sm font-medium text-gray-600 dark:text-gray-400">
        Contact Status Analytics
      </span>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="count" fill="#312e81" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [value, 'Contacts']}
            labelFormatter={(label) => `Status: ${label}`}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContactAnalyticsChart;
