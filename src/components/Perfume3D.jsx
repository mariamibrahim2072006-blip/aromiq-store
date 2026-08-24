import { motion } from "framer-motion";

export default function Perfume3D() {
  return (
    <div className="perfume-stage">

      <motion.div
        className="perfume-shadow"
        animate={{
          scaleX: [1, 1.08, 1],
          opacity: [0.2, 0.28, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="perfume-bottle"
        animate={{
          y: [0, -12, 0],
          rotateY: [-4, 4, -4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >

        <div className="bottle-cap">
          <div className="cap-top" />
        </div>

        <div className="bottle-neck" />

        <div className="bottle-body">

          <div className="bottle-glass" />

          <div className="bottle-label">
            <small>AROMIQ</small>
            <strong>ROSE</strong>
            <span>EAU DE PARFUM</span>
          </div>

          <div className="bottle-highlight" />

        </div>

      </motion.div>

      <div className="floating-petal petal-one">✦</div>
      <div className="floating-petal petal-two">✿</div>
      <div className="floating-petal petal-three">✦</div>

    </div>
  );
}