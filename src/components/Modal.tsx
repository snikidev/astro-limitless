import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useUnit } from "effector-react";
import { $menuIsOpen, toggleMenu } from "../layouts/store";
import { useTranslations } from "../i18n/utils";

interface Props {
  lang: "en" | "ru";
}

export const Modal = ({ lang }: Props) => {
  const [isOpen, setIsOpen] = useUnit([$menuIsOpen, toggleMenu]);
  const t = useTranslations(lang);

  return (
    <NextModal isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              ⚠️ {t("modal.header")} ⚠️
            </ModalHeader>
            <ModalBody>
              <p>
                {t("modal.paragraph1")}
              </p>
              <p>{t("modal.how")}</p>
              <p>
                {t("modal.paragraph2")}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                {t("modal.action")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextModal>
  );
};
