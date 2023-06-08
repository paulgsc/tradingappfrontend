import { motion } from "framer-motion";

export const FramerNotifications = ({ notifications }) => (
  <>
    {notifications && (
      <div className="flex items-center justify-center rounded-full h-5 w-5 xl:h-6 xl:w-6">
        <motion.div
          className={`notification ${notifications > 0 ? "highlight" : ""}`}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
          initial={{
            backgroundColor: "#b3261e",
            scale: 1,
          }}
          animate={{
            backgroundColor: ["#b3261e", "#ffaa00"],
            scale: [1, 1.2, 1],
            transition: {
              duration: 2,
              repeat: 1,
              repeatDelay: 2, // Delay between repetitions
            },
          }}
        >
          <span className="flex text-xs text-white font-bold text-center">
            {" "}
            {notifications}
          </span>
        </motion.div>
      </div>
    )}
  </>
);
