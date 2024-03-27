import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { data } from "../utils/data";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const CaseStudy = () => {
  const { id } = useParams();
  const details = data.filter((d) => d.title.toLowerCase() == id)[0];

  if (!details) {
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
            <h1 className="text-[100px] text-right max-xl:text-[80px] max-lg:text-[60px] leading-[1.15] max-md:text-[40px] font-bold uppercase">
              Page Does not exist
            </h1>
          </div>
        </motion.section>
      </AnimatePresence>
    );
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
        <div className="px-10 max-md:px-5 py-10 ">
          <div className="flex max-md:flex-col gap-10 max-md:gap-5 justify-between">
            <div>
              <h1 className="text-[80px] max-xl:text-[70px] max-lg:text-[60px] leading-[1.15] max-md:text-[40px] font-bold">
                {details.title}
              </h1>
              <p className=" tracking-normal text-[20px] max-md:text-[16px] font-semibold opacity-40 mt-2 md:max-w-[70%]">
                {details.brief}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end max-md:flex-row max-md:items-center">
              {details.link && (
                <a target="_blank" href={details.link}>
                  <FiExternalLink size={30} />
                </a>
              )}
              {details.tag.includes("•") ? (
                <div className="flex flex-nowrap gap-2">
                  {details.tag.split("•").map((data) => {
                    return (
                      <p className=" tracking-normal text-lg max-md:text-sm border p-2 px-5 rounded-full">
                        {data}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <p className=" tracking-normal text-lg max-md:text-sm border p-2 px-5 rounded-full">
                  {details.tag}
                </p>
              )}
            </div>
          </div>
        </div>
        <ResponsiveMasonry
          id="works"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1180: 3 }}
          className=""
        >
          <Masonry className=" mt-10">
            {details.images.map((image, i) => (
              <div
                className="relative overflow-hidden group border border-black"
                key={i}
              >
                <img
                  src={image}
                  style={{
                    width: "100%",
                    display: "block",
                    // maxHeight: "300px",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </motion.section>
    </AnimatePresence>
  );
};

export default CaseStudy;
