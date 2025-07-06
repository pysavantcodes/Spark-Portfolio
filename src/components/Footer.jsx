import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-t-white/10 p-7 text-sm text-white/20 font-semibold text-center ">
      <p className="tracking-normal">
        Spark Of Lagos © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
