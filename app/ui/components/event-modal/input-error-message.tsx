interface Props {
  isThereError: boolean;
  errorMessage: string | undefined;
  isRootError?: boolean;
}
import { cn } from "@/app/util/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function InputErrorMessage({
  isThereError,
  errorMessage,
  isRootError,
}: Props) {
  return (
    <AnimatePresence>
      {isThereError && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "mt-[2px] pl-1 text-red-800 text-base",
            isRootError && "text-center"
          )}
        >
          {errorMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
