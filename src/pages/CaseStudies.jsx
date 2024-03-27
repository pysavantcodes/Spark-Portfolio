import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import MenuToggle from "../components/MenuToggle";
import { data } from "../utils/data";
import { FiArrowUpRight } from "react-icons/fi";

const CaseStudies = () => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
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
        <div className="px-10 max-md:px-5">
          <h1 className="text-[100px] text-right max-xl:text-[80px] max-lg:text-[60px] leading-[1.15] max-md:text-[40px] font-bold">
            Case Studies
          </h1>
          <div className="flex items-end justify-end w-full">
            <p className="tracking-normal text-[20px] max-md:text-[16px] font-semibold opacity-40 mt-2 md:max-w-[70%] text-right float-right">
              Showcase of engaging short viral CGI videos, TV commercial promos,
              and customizable 3D artwork and AI-generated imagery services.
            </p>
          </div>
        </div>
        {Object.entries(groupedData).map(([type, items], index) => {
          return (
            <div key={index} className="mt-14 border-t border-t-white/10">
              <p className="text-[90px] text-right max-xl:text-[80px] max-lg:text-[60px] leading-[1.15] max-md:text-[40px] font-bold px-10 max-md:px-5 opacity-30 py-5 capitalize">
                {type}
              </p>
              <ResponsiveMasonry
                id="works"
                columnsCountBreakPoints={{ 350: 1, 750: 2, 1180: 3 }}
                className=""
              >
                <Masonry className=" pt-0">
                  {items.map((work, i) => (
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
                        crossOrigin="anonymous"
                        decoding="auto"
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
            </div>
          );
        })}
      </motion.section>
    </AnimatePresence>
  );
};

export default CaseStudies;
