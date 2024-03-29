import { useEffect } from "react";
import "./App.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosMail } from "react-icons/io";
import { SiOpensea } from "react-icons/si";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { companies, data } from "./utils/data";
import Slider from "react-infinite-logo-slider";

function App() {
  const links = [
    {
      link: "mailto:hello@sparkoflagos.com",
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
    // {
    //   link: "https://wa.me/+2348094850184",
    //   icons: <FaWhatsapp />,
    // },
    {
      link: "https://twitter.com/OlaIsparks",
      icons: <FaTwitter />,
    },
  ];

  useEffect(() => {
    gsap.config({ trialWarn: false });
    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType("h1#text-anim", { type: "chars" });

    gsap.to(split.chars, {
      //   delay: 1,
      color: "white",
      stagger: 1,
      ease: "power4",
      scrollTrigger: {
        trigger: "h1#text-anim",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

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
        <header className="gap-x-28 items-center max-md:flex-col max-md:text-center gap-y-5 relative ">
          <div className="flex justify-between p-10 items-end z-[20] max-md:px-5 mix-blend-difference w-full max-[1179px]:flex-col max-[1179px]:items-start max-[1179px]:gap-5">
            <div>
              <h1 className="text-[50px] leading-[1.15] max-md:text-[24px] font-bold pl-[48px] max-md:pl-[0px] text-left max-md:block flex items-center gap-1.5 whitespace-nowrap max-md:leading-none">
                <span>Spark Of Lagos</span> <span className="max-md:hidden">-</span>{" "} <br className="md:hidden"/>
                <span className="opacity-40 max-md:text-lg tracking-normal">
                  Creative Agency
                </span>
              </h1>
              <div className="flex items-center gap-5 max-md:gap-4 mt-1.5">
                <div className="w-[30px] h-[30px] max-md:w-[15px] max-md:h-[15px] bg-[#ff9400] rounded-full"></div>
                <div className="text-[80px] font-bold  h-[100px] leading-[80px] max-md:leading-[40px] max-md:h-[40px] overflow-hidden text-left max-xl:text-[60px] max-lg:text-[40px] max-lg:h-[60px] max-lg:leading-[60px] text-[#ff9400] max-md:text-[25px]">
                  <h1 className="v-slides">VFX/CGI</h1>
                  <h1 className="v-slides">AI</h1>
                  <h1 className="v-slides">Photo/Video Production</h1>
                  <h1 className="v-slides">Post Production services</h1>
                  <h1 className="v-slides">Content-Creation</h1>
                  <h1 className="v-slides">Brand Design</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-x-3 max-md:items-center max-md:justify-center max-md:pl-[30px]">
              {links.map((link, index) => {
                return (
                  <a
                    style={{ transition: ".3s all" }}
                    className="border border-white/[15%] p-4 max-md:p-3 flex rounded-full items-center justify-center hover:border-[#ff9400] hover:text-[#ff9400]"
                    key={index}
                    href={link.link}
                  >
                    {link.icons}
                  </a>
                );
              })}
            </div>
          </div>
          {/* ?autoplay=1&loop=1&autopause=0 */}
          <div className="embed-container mt-10 max-md:mt-4 bg-white/5">
            <video
              playsInline
              preload="auto"
              autoPlay
              muted
              loop
              className="w-full"
              controls={false}
              src="https://github.com/pysavantcodes/google-sign-in-expo/raw/main/sparkvfx%20demo%20reel%201080p.mp4"
            />

            <a
              href="https://vimeo.com/738460924"
              target="_blank"
              className="absolute md:top-7 md:right-7 top-5 right-5 flex justify-end"
            >
              <FiExternalLink className="mix-blend-difference max-md:text-[25px] text-[30px]" />
            </a>
          </div>
        </header>

        <div className="p-[100px]  max-2xl:px-[70px] py-[150px] flex justify-end max-md:justify-start max-md:px-10 max-md:py-[120px]">
          <h1
            id="text-anim"
            className="font-semibold text-[80px] max-2xl:text-[60px] max-lg:text-[40px] max-md:text-[30px] max-md:w-full leading-none w-[70%] text-white/10 text-right [word-spacing:2px]"
          >
            We help brands grow with compelling content and expert
            post-production techniques to boost visibility and engagement.
          </h1>
        </div>
        <div className="pb-[5.3rem]">
          <Slider
            className="w-full"
            width="250px"
            duration={10}
            pauseOnHover={true}
            blurBorders={true}
            blurBoderColor={"#0f0f0f"}
          >
            {companies.map((data, index) => {
              return (
                <Slider.Slide className="px-10 object-contain flex items-center">
                  <img
                    className={`w-full object-contain ${
                      index == 4 && "invert"
                    }`}
                    key={index}
                    src={data}
                  />
                </Slider.Slide>
              );
            })}
          </Slider>
        </div>
        <div>
          <h1 className="text-left max-md:text-right text-[25vw] font-bold text-white/10 relative z-[999] leading-none">
            Works
          </h1>
          <ResponsiveMasonry
            id="works"
            columnsCountBreakPoints={{ 350: 1, 750: 2, 1180: 3 }}
            className=""
          >
            <Masonry className=" pt-0">
              {data.slice(0, 6).map((work, i) => (
                <motion.div
                  className="relative overflow-hidden h-[450px] max-md:h-fit max-md:max-h-[450px] group"
                  key={i}
                  initial={{ opacity: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    transition: { delay: i * 0.2, ease: "easeIn" },
                  }}
                >
                  <Link
                    to={`/casestudies/${work.title.toLowerCase()}`}
                    className="absolute top-0 left-0 w-full h-full bg-black/60 items-start justify-end  flex flex-col group hover"
                  >
                    <span className="absolute top-5 right-5">
                      <FiArrowUpRight size={25} />
                    </span>
                    <div className="bg-gradient-to-b from-white/0 to-black/70 p-9 max-md:p-6 w-full">
                      <h1 className="text-[26px] max-md:text-[20px] max-md:leading-[36px] font-bold tracking-wider [word-spacing:2px] transition-all">
                        {work.title}
                      </h1>
                      <h1 className="text-[17px] max-md:text-sm font-semibold tracking-wider [word-spacing:2px] transition-all uppercase opacity-50">
                        {work.tag}
                      </h1>
                    </div>
                  </Link>

                  <img
                    src={work.images[0]}
                    style={{
                      width: "100%",
                      display: "block",
                      // maxHeight: "300px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
          <div className="flex items-center justify-center p-10">
            <Link
              to="/casestudies"
              className="button text-[17px] border border-white flex items-center justify-center"
            >
              <span className="button-content tracking-wide font-semibold">
                View All Works{" "}
              </span>
            </Link>
          </div>
          <div className="text-center flex flex-col items-center p-10 py-14 mb-10">
            <h1 className="font-bold text-[80px] max-2xl:text-[60px] max-lg:text-[40px] max-md:text-[50px] max-md:w-full leading-none [word-spacing:2px] tracking-tight text-center">
              Like what <br className="md:hidden" /> you see?
            </h1>
            <h3 className="font-semibold text-[60px] max-2xl:text-[60px] max-lg:text-[40px] max-md:text-[25px] max-md:w-full leading-none [word-spacing:2px] w-[50%] opacity-40 tracking-tight max-md:pt-2 text-center">
              contact us and <br className="" /> let's work together.
            </h3>
            <Link
              to="/contact"
              className="button text-[17px] border border-white flex items-center justify-center mt-10"
            >
              <span className="button-content tracking-wide font-semibold">
                Let's Talk
              </span>
            </Link>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}

export default App;
