import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuToggle from "../components/MenuToggle";

const CaseStudy = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
  const navigate = useNavigate();
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
                  className="text-[45px] uppercase hover:text-[#ff9400] max-md:text-[25px]"
                >
                  Home
                </h3>
              </motion.span>
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
      </motion.section>
    </AnimatePresence>
  );
};

export default CaseStudy;
