import Button from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import Modal, { ModalHeader } from "@components/ui/Modal";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  closeModal: any;
  handleAddLink: any;
};

const AddNewLinkModal = ({ isOpen, closeModal, handleAddLink }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    handleAddLink({ title, url });
    reset();
    closeModal();
  };

  const reset = () => {
    setTitle("");
    setUrl("");
  };
  return (
    <Modal closeModal={closeModal} size="sm" isOpen={isOpen}>
      <ModalHeader className="text-xl font-medium mb-4 text-gray-500">
        Add new link
      </ModalHeader>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          // label="Link title"
          placeholder="Enter link title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          required
        />
        <Input
          // label="Url"
          placeholder="Enter url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          value={url}
          required
        />
        <div className="flex gap-2 ">
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => {
              reset();
              closeModal();
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewLinkModal;
