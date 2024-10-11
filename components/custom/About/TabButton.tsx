import React from "react";
import { motion } from "framer-motion";

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}

const variants = {
  default: {
    width: 0,
  },
  active: {
    width: "calc(100% - 0.75rem)",
  },
};

const TabButton = ({ active, selectTab, children }: TabButtonProps) => {
  const buttonClasses = active ? "text-white" : "text-slate-100";
  return (
    <button onClick={selectTab}>
      <p className={`${buttonClasses} mr-3 font-semibold textOne`}>{children}</p>
      <motion.div
        className="h-1 bg-mycolor-100 mt-2 mr-3"
        initial="default"
        animate={active ? "active" : "default"}
        variants={variants}
      />
      <p></p>
    </button>
  );
};

export default TabButton;
