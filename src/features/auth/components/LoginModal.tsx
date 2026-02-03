/**
 * Auth Feature - Login modal (opens on "登录" click)
 */
import { Modal } from "@/components/Modal";
import { LoginForm } from "./LoginForm";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="登录">
      <LoginForm onSuccess={onClose} onCancel={onClose} showCancel />
    </Modal>
  );
}
