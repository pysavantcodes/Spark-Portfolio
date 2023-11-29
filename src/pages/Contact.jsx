import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuToggle from "../components/MenuToggle";
import { TypeAnimation } from "react-type-animation";

const Contact = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const submitForm = (e)=>{
    e.preventDefault()
  }

  return (
    <AnimatePresence>
      <motion.section
        id="body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ opacity: 0 }}
        className="bg-[#0f0f0f] w-full h-full"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ zIndex: 99 }}
              className="w-full h-full fixed top-0 left-0  bg-[#0f0f0f] flex items-center justify-center flex-col gap-y-1"
            >
              <motion.a
                onClick={() => {
                  toggleOpen();
                  navigate("/");
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "linear" }}
                href="#works"
                className="hover:text-[#ff9400]"
              >
                <h3
                  style={{ transition: ".5s all" }}
                  className="text-[45px] uppercase hover:text-[#ff9400] max-md:text-[25px]"
                >
                  Home
                </h3>
              </motion.a>
              <motion.span
                onClick={() => {
                  toggleOpen();
                  navigate("/casestudies");
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ease: "linear" }}
                className="hover:text-[#ff9400] cursor-pointer"
              >
                <h3
                  style={{ transition: ".5s all" }}
                  className="text-[45px] uppercase hover:text-[#ff9400] max-md:text-[25px]"
                >
                  Case Study
                </h3>
              </motion.span>
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, ease: "linear" }}
                href="#0"
                className="hover:text-[#ff9400]"
                onClick={() => {
                  toggleOpen();
                  navigate("/contact");
                }}
              >
                <h3
                  style={{ transition: ".5s all" }}
                  className="text-[45px] uppercase hover:text-[#ff9400] max-md:text-[25px]"
                >
                  Contact
                </h3>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex-row flex w-full p-10 max-md:p-7 justify-between items-center">
          <h3 style={{ zIndex: 9999 }}>SOL</h3>
          <MenuToggle
            isOpen={isOpen}
            onClick={() => toggleOpen()}
            strokeWidth="2.5"
            color="white"
            transition={{ ease: "easeOut", duration: 0.2 }}
            width="45"
            height="24"
          />
        </div>
        <div className="w-full h-full items-center justify-center flex flex-col max-w-[700px] mx-auto p-10 pt-0 max-md:pt-10">
          <h1 className="text-[42px] leading-[48px] max-md:text-[30px] max-md:leading-[36px] text-center">
            Spark Of Lagos
            {/* <TypeAnimation
              sequence={["Film Maker", 4000, "VFX Artist", 4000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={false}
            /> */}
          </h1>
          <p className="text-[29px] leading-[25px] max-md:pt-3 max-md:text-[20px] opacity-75">
            contact me and let's work together
          </p>
          <form action="#" onSubmit={submitForm} class="space-y-5 w-full mt-10">
            <div>
              <label for="email" className="block mb-2 text-sm tracking-normal">
                Your email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="shadow-sm bg-white/[3%] border-[1px] border-white/20 focus:border-white/80 text-sm outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="name@flowbite.com"
                style={{ transition: ".3s all" }}
                required
              />
            </div>
            <div>
              <label for="subject" className="block mb-2 text-sm">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="subject"
                id="subject"
                className="shadow-sm bg-white/[3%] border-[1px] border-white/20 focus:border-white/80 text-sm outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="Let's talk!"
                style={{ transition: ".3s all" }}
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label for="message" className="block mb-2 text-sm">
                Your message
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="message"
                rows="6"
                className="block shadow-sm bg-white/[3%] border-[1px] border-white/20 focus:border-white/80 text-sm outline-none w-full p-4 placeholder:opacity-50 tracking-normal"
                style={{ transition: ".3s all" }}
                required
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button type="submit">
              <a
                style={{ transition: ".3s all" }}
                className="p-3 px-7 text-[15px] border-[3px] cursor-pointer border-white tracking-wider text-bold hover:bg-[#ff9400] hover:border-[#ff9400] items-center hover:text-[#0f0f0f]"
              >
                SUBMIT
              </a>
            </button>
          </form>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Contact;
