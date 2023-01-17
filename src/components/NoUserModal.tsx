import { signIn } from "next-auth/react";
import type { SetStateAction } from "react";
import { HiOutlineX } from "react-icons/hi";

export const NoUserModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (value: SetStateAction<boolean>) => void;
}) => {
  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        showModal && "modal-open"
      }`}
    >
      <div className="modal-box">
        <div className="text-right text-xl font-bold">
          <button onClick={() => setShowModal(false)}>
            <HiOutlineX />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 text-center">
          <h3 className="text-lg font-bold">
            Must be signed in to perform this action
          </h3>
          <button className="btn" onClick={() => signIn()}>
            Sign In Now
          </button>
        </div>
      </div>
    </div>
  );
};
