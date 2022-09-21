import ClaimInput from "@components/homepage/ClaimInput";
import Modal, { ModalHeader } from "@components/ui/Modal";
import React from "react";

type Props = {
  closeModal: any;
  isOpen: boolean;
};

const ClaimModal = (props: Props) => {
  return (
    <Modal size="sm" closeModal={props.closeModal} isOpen={props.isOpen}>
      <ModalHeader className="text-xl mb-4">Claim your link</ModalHeader>
      <ClaimInput />
    </Modal>
  );
};

export default ClaimModal;
