// getScrollAnimation.js
export default function getScrollAnimation() {
  return {
    offscreen: {
      y: 150,
      opacity: 0,
    },
    onscreen: ({ duration = 2 } = {}) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration,
        stiffness: 100, // Adjust stiffness for a snappier animation
        damping: 8,     // Lower damping increases bounciness
        bounce: 0.5,    // Adds more bounce to the animation
      },
    }),
  };
}
