import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useUnit } from "effector-react";
import {  $menuIsOpen, toggleMenu } from "../layouts/store";

export const Modal = () => {
  const [isOpen, setIsOpen] = useUnit([$menuIsOpen, toggleMenu]);
  console.log(isOpen);
  return (
    <NextModal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              ⚠️ Important ⚠️
            </ModalHeader>
            <ModalBody>
              <p>
                This modal was opened by a click on a button inside the `.astro`
                component. And it can be closed by clicking on the close button
                inside the React component.
              </p>
              <p>How?</p>
              <p>
                Global framework agnostic state store made, in this case, with
                Effector.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Got it!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextModal>
  );
};
