import React from "react";
import { motion } from "framer-motion";

const MenuToggle = ({
  isOpen = false,
  width = 24,
  height = 12,
  strokeWidth = 1,
  color = "#000",
  transition = null,
  lineProps = null,
  ...props
}) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * width) / height;

  return (
    <motion.svg
      style={{ cursor: "pointer", zIndex:99999 }}
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}className={"max-md:w-[35px] max-md:h-[12px]"}
      {...props}
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="0"
        y2="0"
        variants={top}
        {...lineProps}
      />
      {/* <motion.line
        x1="0"
        x2={unitWidth}
        y1="2"
        y2="2"
        variants={center}
        {...lineProps}
      /> */}
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="4"
        y2="4"
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  );
};

export default MenuToggle;
