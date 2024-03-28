import React, { useState } from "react";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Contact = () => {
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
        style={{ overflowY: "auto" }}
        exit={{ opacity: 0 }}
        className="bg-[#0f0f0f] w-full h-full py-24 max-md:py-0"
      >
        <div className="w-full items-center justify-center flex max-w-[1600px] mx-auto p-10 pt-0 max-md:pt-10 max-[1000px]:flex-col max-[1000px]:gap-10">
          <div className="w-[70%] max-[1000px]:w-full">
            <h1 className="text-[120px] max-xl:text-[80px] max-lg:text-[60px] leading-[1.15] max-md:text-[40px] font-bold">
              Let's Talk
            </h1>
            <p className="text-[22px] leading-[25px] opacity-70 max-md:pt-1 max-md:text-[17px] tracking-normal max-md:w-[90%]">
              contact me and let's work together
            </p>
          </div>
          <form
            action="#"
            onSubmit={submitForm}
            className="space-y-5 w-[70%] max-[1000px]:w-full"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm tracking-normal"
              >
                Your Name
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="name"
                id="name"
                className="shadow-sm bg-white/[3%] text-[16px] border-[1px] border-white/20 focus:border-white/80 outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="John Doe"
                style={{ transition: ".3s all" }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm tracking-normal"
              >
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
            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm tracking-normal"
              >
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
            <a
              href={`mailto:hello@sparkoflagos.com?subject=${subject}&body=Hello, I am ${email}, ${comment}`}
              className="button !h-[55px] w-fit text-[17px] border border-white flex items-center justify-center"
            >
              <span className="button-content tracking-wide font-semibold">
                Submit
              </span>
            </a>
          </form>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Contact;
