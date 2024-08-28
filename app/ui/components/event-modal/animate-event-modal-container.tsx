import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  isModalOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
  modalTypeName: string;
}

export default function AnimateEventModalContainer({
  isModalOpen,
  children,
  onCloseModal,
  modalTypeName,
}: Props) {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, x: "-50%", y: "-40px" }}
          animate={{ opacity: 1, y: "0px" }}
          exit={{ opacity: 0, y: "-40px" }}
          className="p-2 w-[95%] sm:w-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div
            className="
              w-[400px] max-w-full
              absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50
              p-4 rounded  bg-white flex flex-col gap-4
            "
          >
            <CloseEventModalButton
              onClose={onCloseModal}
              modalTypeName={modalTypeName}
            />
            {children}
          </div>
        </motion.div>
      )}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute inset-full bg-black bg-opacity-50  w-full h-full z-10 top-0 left-0"
          onClick={onCloseModal}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseEventModalButton({
  onClose,
  modalTypeName,
}: {
  onClose: () => void;
  modalTypeName: string;
}) {
  return (
    <div className=" flex flex-col">
      <button onClick={onClose} className=" ml-auto">
        <XMarkIcon className="h-7 w-7 text-gray-500 hover:text-gray-600" />
      </button>
      <h3 className=" text-xl mx-auto">{modalTypeName}</h3>
    </div>
  );
}
