import { AnimatePresence, useCycle, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuToggle from "./MenuToggle";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import logo from "../assets/portrait.jpg"
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

const Root = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.position = isOpen ? "fixed" : "relative";
  }, [isOpen]);

  const navbarRef = useRef(null);

  useEffect(() => {
    const showNav = gsap
      .fromTo(
        navbarRef.current,
        {
          opacity: 0,
          visibility: "hidden",
        },
        {
          opacity: 1,
          visibility: "visible",
          duration: 0.4,
        }
      )
      .progress(1);
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.progress > 0.01 ? showNav.reverse() : showNav.play();
      },
    });
  }, []);
  return (
    <div>
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
              className="w-full h-full fixed top-0 left-0  bg-[#0f0f0f] flex items-end justify-center flex-col gap-y-2"
            >
              <motion.span
                onClick={() => {
                  toggleOpen();
                  navigate("/");
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ease: "linear" }}
                className="hover:text-[#ff9400] cursor-pointer"
              >
                <h3
                  style={{ transition: ".5s all" }}
                  className="text-[55px] hover:text-[#ff9400] max-md:text-[35px] font-semibold mr-10 max-md:mr-5"
                >
                  Home
                </h3>
              </motion.span>
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
                  className="text-[55px] hover:text-[#ff9400] max-md:text-[35px] font-semibold mr-10 max-md:mr-5"
                >
                  Case Studies
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
                  className="text-[55px] hover:text-[#ff9400] max-md:text-[35px] font-semibold mr-10 max-md:mr-5"
                >
                  Contact
                </h3>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          ref={navbarRef}
          className="flex-row flex w-full p-10 max-md:p-7 justify-between items-center sticky top-0 z-[9999999]"
        >
          <Link to={"/"}><img
            src={logo}
            alt=""
            className="w-[70px] h-[70px] max-md:w-[50px] max-md:h-[50px] object-cover rounded-full pointer-events-none select-none"
          /></Link>
          <MenuToggle
            isOpen={isOpen}
            onClick={() => toggleOpen()}
            strokeWidth="2.5"
            color="white"
            transition={{ ease: "easeOut", duration: 0.2 }}
            width="45"
            height="15"
          />
        </div>
      </motion.section>
      <ScrollToTop/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Root;
