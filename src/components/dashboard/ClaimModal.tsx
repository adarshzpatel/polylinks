import ClaimInput from "@components/homepage/ClaimInput";
import Modal, { ModalHeader } from "@components/ui/Modal";
import { sign } from "crypto";
import React from "react";
import { useSigner } from "wagmi";

type Props = {
  closeModal: any;
  isOpen: boolean;
};

const ClaimModal = (props: Props) => {
  const { data: signer } = useSigner();

  return (
    <Modal size="sm" closeModal={props.closeModal} isOpen={props.isOpen}>
      <ModalHeader className="text-xl mb-4">Claim your link</ModalHeader>
      {signer && <ClaimInput closeModal={props.closeModal} />}
      {!signer && "Please Connect your wallet first"}
    </Modal>
  );
};

export default ClaimModal;
