import { useEffect, useState } from "react";
import "./App.css";
import { TypeAnimation } from "react-type-animation";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import MenuToggle from "./components/MenuToggle";
import { IoIosMail } from "react-icons/io";
import { SiOpensea } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";
import {
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function App() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const navigate = useNavigate();
  const images = [
    "https://picsum.photos/900/500?image=900",
    "https://picsum.photos/900/400?image=250",
    "https://picsum.photos/1000/400?image=235",
    "https://picsum.photos/1000/300?image=206",
    "https://picsum.photos/1000/300?image=400",
    "https://picsum.photos/1000/300?image=600",
    "https://picsum.photos/600/300?image=300",
    "https://picsum.photos/1000/300?image=700",
    "https://picsum.photos/1000/300?image=200",
    "https://picsum.photos/1000/300?image=230",
    // "https://picsum.photos/1000/400?image=250",
  ];

  const links = [
    {
      link: "#0",
      icons: <IoIosMail />,
    },
    {
      link: "https://opensea.io/sparkoflagos",
      icons: <SiOpensea />,
    },
    {
      link: "https://www.instagram.com/sparkoflagos/",
      icons: <FaInstagram />,
    },
    {
      link: "https://www.linkedin.com/in/olanrewaju-kazeem-1a27a2b8/",
      icons: <FaLinkedinIn />,
    },
    {
      link: "https://wa.me/+2348094850184",
      icons: <FaWhatsapp />,
    },
    {
      link: "https://twitter.com/OlaIsparks",
      icons: <FaTwitter />,
    },
  ];

  useEffect(() => {
    document.body.style.position = isOpen ? "fixed" : "relative";
  }, [isOpen]);

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
                onClick={() => toggleOpen()}
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
                  Selected Works
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
                  Case Studies
                </h3>
              </motion.span>
              <motion.span
                onClick={() => {
                  toggleOpen();
                  navigate("/contact");
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
                  Contact
                </h3>
              </motion.span>
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
        <div className="flex-row flex justify-center gap-x-28 items-center max-md:flex-col p-5 max-md:py-10 pb-24 max-md:pb-[5rem] max-md:text-center gap-y-5">
          <div>
            <h1 className="text-[42px] leading-[48px] max-md:text-[30px] max-md:leading-[36px]">
              Spark Of Lagos |{" "}
              <TypeAnimation
                sequence={["Film Maker", 4000, "VFX Artist", 4000]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={false}
              />
            </h1>
            <p className="text-[25px] leading-[25px] opacity-70 max-md:pt-3 max-md:text-[20px]">
              Design, craft & creativity for movies, games, advertising.
            </p>
            <div className="flex flex-row py-6 gap-x-3 max-md:items-center max-md:justify-center">
              {links.map((link, index) => {
                return (
                  <a
                    style={{ transition: ".3s all" }}
                    className="bg-white/10 p-3 flex rounded-full items-center justify-center hover:bg-white/[15%] hover:text-black"
                    key={index}
                    href={link.link}
                  >
                    {link.icons}
                  </a>
                );
              })}
            </div>
            <button
              style={{ transition: ".3s all" }}
              className="p-3 px-5 text-[15px] border-[3px] border-white tracking-wider text-bold hover:bg-[#ff9400] hover:border-[#ff9400] hover:text-[#0f0f0f]"
            >
              &#9654; &nbsp; SHOWREEL
            </button>
          </div>
          <img
            src="https://media.licdn.com/dms/image/C4D03AQEshb4PBwdIQQ/profile-displayphoto-shrink_800_800/0/1625645667953?e=1699488000&v=beta&t=YcXmZUhJSw-Z0lHNhJNicVdOOZqu604kknQ8oa-G3Lk"
            alt=""
            className="w-[170px] h-[170px] max-md:w-[150px] max-md:h-[150px] object-cover rounded-full pointer-events-none select-none max-md:hidden"
          />
        </div>
        <ResponsiveMasonry
          id="works"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}
        >
          <div id="works" className="pb-[27px] max-md:pb-[5px]"></div>
          <Masonry className="p-[27px] max-md:p-[20px] pt-0" gutter="25px">
            {images.map((image, i) => (
              <motion.div
                className="relative rounded-[20px] overflow-hidden"
                key={i}
                initial={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: i * 0.2, ease: "easeIn" },
                }}
              >
                <motion.a
                  href="#0"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                  }}
                  className="absolute top-0 left-0 w-full h-full bg-black/60 items-center justify-center flex flex-row"
                >
                  <span className="absolute top-5 right-5">
                    <FiArrowUpRight size={20} />
                  </span>
                  <h1 className="text-[42px] leading-[48px] max-md:text-[30px] max-md:leading-[36px]">
                    TEST 1
                  </h1>
                </motion.a>

                <img
                  src={image}
                  style={{
                    width: "100%",
                    display: "block",
                    // maxHeight: "300px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </motion.section>
    </AnimatePresence>
  );
}

export default App;
