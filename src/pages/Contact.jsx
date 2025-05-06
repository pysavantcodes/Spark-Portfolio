import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_tzr447l",
        "template_o52lae7",
        formRef.current,
        "ff5Jq8dUitjbknJdb"
      )
      .then(
        () => {
          setSending(false);
          toast.success("Submission successfully!");
          formRef.current.reset();
        },
        (error) => {
          setSending(false);
          toast.error("Failed to submit. Please try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <AnimatePresence>
      <motion.section
        id="body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ opacity: 0 }}
        className="bg-[#0f0f0f] w-full h-full py-24 max-md:py-0"
        style={{ overflowY: "auto" }}
      >
        <div className="w-full items-center justify-center flex max-w-[1600px] mx-auto p-10 pt-0 max-md:pt-10 max-[1000px]:flex-col max-[1000px]:gap-10">
          <div className="w-[70%] max-[1000px]:w-full">
            <h1 className="text-[120px] max-xl:text-[80px] max-lg:text-[60px] leading-[1.15] max-md:text-[40px] font-bold">
              Let's Talk
            </h1>
            <p className="text-[22px] leading-[25px] opacity-70 max-md:pt-1 max-md:text-[17px] tracking-normal max-md:w-[90%]">
              contact us and let's work together
            </p>
          </div>
          <form
            ref={formRef}
            onSubmit={submitForm}
            className="space-y-5 w-[70%] max-[1000px]:w-full"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm tracking-normal"
              >
                Your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                className="shadow-sm bg-white/[3%] text-[16px] border-[1px] border-white/20 focus:border-white/80 outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="johndoe@email.xyz"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm tracking-normal"
              >
                Your Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                className="shadow-sm bg-white/[3%] text-[16px] border-[1px] border-white/20 focus:border-white/80 outline-none block w-full p-4 placeholder:opacity-50 tracking-normal"
                placeholder="John Doe"
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
                name="message"
                id="message"
                rows="6"
                className="block shadow-sm bg-white/[3%] border-[1px] border-white/20 focus:border-white/80 text-[16px] outline-none w-full p-4 placeholder:opacity-50 tracking-normal"
                required
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="button !h-[55px] w-fit text-[17px] border border-white flex items-center justify-center"
            >
              <span className="button-content tracking-wide font-semibold">
                {sending ? "Sending..." : "Submit"}
              </span>
            </button>
          </form>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Contact;
