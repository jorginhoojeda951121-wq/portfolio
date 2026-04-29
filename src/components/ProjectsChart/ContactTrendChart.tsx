"use client";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getContacts, Contact } from "@/lib/data-manager";
import { contactEvents } from "@/lib/contact-events";

const ContactTrendChart = () => {
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

  // Generate trend data based on contact dates
  const getTrendData = () => {
    const now = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return last7Days.map(date => {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayContacts = contacts.filter(contact => {
        const contactDate = new Date(contact.timestamp);
        return contactDate >= dayStart && contactDate <= dayEnd;
      });

      return {
        name: dayName,
        contacts: dayContacts.length,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      };
    });
  };

  const data = getTrendData();

  return (
    <div className="w-full lg:h-64 h-44 lg:my-10">
      <span className="flex float-end text-sm font-medium text-gray-600 dark:text-gray-400">
        Contact Trends (Last 7 Days)
      </span>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [value, 'New Contacts']}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.date;
              }
              return label;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="contacts" 
            stroke="#8884d8" 
            fill="#312e81" 
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContactTrendChart;
