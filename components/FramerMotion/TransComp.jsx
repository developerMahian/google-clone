import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useRouter } from "next/router";

const TransComp = ({ children }) => {
  const router = useRouter();

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence exitBeforeEnter>
        <m.div
          key={router.asPath}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.45 }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default TransComp;
