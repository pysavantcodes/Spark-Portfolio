import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuToggle from "../components/MenuToggle";

const Contact = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <AnimatePresence>
      <motion.section
        id="body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ overflowY: 'auto' }} 
        exit={{ opacity: 0 }}
        className="bg-[#0f0f0f] w-full h-full"
      >
        <div className="w-full items-center justify-center flex flex-col max-w-[700px] mx-auto p-10 pt-0 max-md:pt-10">
          <h1 className="text-[42px] leading-[45px] max-md:text-[30px] max-md:leading-[36px] font-semibold">
            Spark Of Lagos
          </h1>
          <p className="text-[22px] leading-[25px] opacity-70 max-md:pt-1 max-md:text-[17px] tracking-normal max-md:w-[90%]">
            contact me and let's work together
          </p>
          <form
            action="#"
            onSubmit={submitForm}
            className="space-y-5 w-full mt-10"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm tracking-normal"
              >
                Your email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="shadow-sm bg-white/[3%] text-[16px] border-[1px] border-white/20 focus:border-white/80 outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="name@flowbite.com"
                style={{ transition: ".3s all" }}
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="subject"
                id="subject"
                className="shadow-sm bg-white/[3%] border-[1px] border-white/20 focus:border-white/80 text-[16px] outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="Let's talk!"
                style={{ transition: ".3s all" }}
                required
              />
            </div>
            <div className="">
              <label htmlFor="message" className="block mb-2 text-sm">
                Your message
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="message"
                rows="6"
                className="block shadow-sm bg-white/[3%] border-[1px] border-white/20 focus:border-white/80 text-[16px] outline-none w-full p-4 placeholder:opacity-50 tracking-normal"
                style={{ transition: ".3s all" }}
                required
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              style={{ transition: ".3s all" }}
              className="p-3 px-7 flex text-[15px] border-[3px] cursor-pointer border-white tracking-wider text-bold hover:bg-[#ff9400] hover:border-[#ff9400] items-center hover:text-[#0f0f0f]"
              type="submit"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Contact;
