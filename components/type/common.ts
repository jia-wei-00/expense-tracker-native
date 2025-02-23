import { Modal } from "@/components/ui/modal";

export type CommonSize = "sm" | "md" | "lg";

export interface PropsWithSize {
  size?: CommonSize;
}

export type ModalProps = React.ComponentProps<typeof Modal>;
