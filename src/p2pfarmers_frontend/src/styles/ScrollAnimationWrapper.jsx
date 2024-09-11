// ScrollAnimationWrapper.jsx
import { motion } from "framer-motion";

export default function ScrollAnimationWrapper({ children, className, ...props }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }} // Adjust amount for when animation triggers
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
