"use client";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import { addContact } from "@/lib/data-manager";
const email_user_id = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
emailjs.init(email_user_id!);
function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const buttonRef = useRef(null);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();


    if (formData.firstName === "") {
      setError("First Name is required!");
      return;
    } else if (formData.lastName === "") {
      setError("Last Name is required!");
      return;
    } else if (formData.email === "") {
      setError("Email is required!");
      return;
    } else if (formData.phone === "") {
      setError("Phone number is required!");
      return;
    } else if (formData.message === "") {
      setError("Message is required!");
      return;
    }

    try {
      const notificationResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID!,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          to_name: "Maxwell Carter",
          email: "maxwell.carter1109@gmail.com",
          from_email: formData.email,
          phone_number: formData.phone,
          message: formData.message,
        }
      );

      const autoReplyResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          to_name: "Maxwell Carter",
          to_email: "maxwell.carter1109@gmail.com",
          from_email: formData.email,
          phone_number: formData.phone,
          message: formData.message,
        }
      );

      if (notificationResult.text === 'OK' && autoReplyResult.text === 'OK') {
        try {
          await addContact({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            timestamp: new Date().toISOString(),
            status: "new"
          });
        } catch (contactError) {
          console.log('Failed to save contact to database:', contactError);
        }

        try {
          await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL || '', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: `📧 **New Contact Form Message**
              **From:** ${formData.firstName} ${formData.lastName}
              **Email:** ${formData.email}
              **Phone:** ${formData.phone}
              **Message:** ${formData.message}
              **Time:** ${new Date().toLocaleString()}`
            })
          });
        } catch (discordError) {
          console.log('Discord notification failed:', discordError);
        }

        toast.success('Message sent successfully!');
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setError("");
      }
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    }
  };

  return (
    <>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-50%] h-[100%] skew-y-12"
        )}
      />
      <div className="z-50 py-20 bg-slate-100 dark:bg-[#020617]  antialiased  overflow-hidden ">
        <div className="mx-auto max-w-7xl px-4">
          {/* Hero Map */}
          <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
            <div className="mx-auto max-w-max rounded-full border p-1 px-3">
              <p className="text-center text-xs font-semibold leading-normal md:text-sm ">
                Share your thoughts
              </p>
            </div>
            <p className="text-center text-3xl font-bold  md:text-5xl md:leading-10  text-cyan-500">
              Love to hear from you
            </p>
            <p className="mx-auto max-w-4xl text-center text-base  md:text-xl columns-1">
              I think it's great that you're open to hearing from others!
              Sharing thoughts fosters connection and creativity. Whether it's a
              deep insight, casual chat, or random idea, communication builds
              understanding.
            </p>
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
              {/* contact from */}
              <div className="flex items-center justify-center">
                <div className="px-2 md:px-12">
                  <p className="text-2xl font-bold md:text-4xl md:leading-10  text-indigo-500">
                    Get in touch
                  </p>

                  <p className="mt-4 text-lg ">
                    Our friendly team would love to hear from you.
                  </p>
                  <div className="space-y-2 mt-3">
                    <div className="flex text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <MdEmail className="mr-2" /> Email: maxwell.carter1109@gmail.com
                    </div>
                    <div className="flex text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <FaLocationDot className="mr-2" />
                      Location: London, England, UK
                    </div>
                  </div>
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4 rounded-xl  border p-6 pb-5 dark:bg-slate-900 bg-slate-100"
                  >
                    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                      <div className="grid w-full  items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="first_name"
                        >
                          First Name
                          <span className="text-xs text-red-500">*</span>
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="first_name"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        <span className="text-xs text-red-500 min-h-4">
                          {error.includes("First Name")
                            ? "First Name is required!"
                            : ""}
                        </span>
                      </div>
                      <div className="grid w-full  items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="last_name"
                        >
                          Last Name
                          <span className="text-xs text-red-500">*</span>{" "}
                        </label>
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="text"
                          id="last_name"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        <span className="text-xs text-red-500 min-h-4">
                          {error.includes("Last Name")
                            ? "Last Name is required!"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="email"
                      >
                        Email<span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <span className="text-xs text-red-500">
                        {error.includes("Email") ? "Email is required!" : ""}
                      </span>
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="phone_number"
                      >
                        Phone number
                        <span className="text-xs text-red-500">*</span>
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="number"
                        id="phone_number"
                        name="phone"
                        onChange={handleInputChange}
                        value={formData.phone}
                        placeholder="Phone number"
                      />
                      <span className="text-xs text-red-500">
                        {error.includes("Phone number")
                          ? "Phone number is required!"
                          : ""}
                      </span>
                    </div>
                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="message"
                      >
                        Message<span className="text-xs text-red-500">*</span>
                      </label>
                      <textarea
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        id="message"
                        placeholder="Leave us a message"
                        cols={20}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                      <span className="text-xs text-red-500">
                        {error.includes("Message")
                          ? "Message is required!"
                          : ""}
                      </span>
                    </div>
                    <button
                      type="submit"
                      ref={buttonRef}
                      className=" btn w-full rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <Image
                alt="Contact us"
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                className="hidden w-full rounded-lg object-cover drop-shadow-xl lg:block"
                src="./Mention-bro.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
