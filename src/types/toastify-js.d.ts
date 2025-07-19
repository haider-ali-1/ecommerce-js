declare module "toastify-js" {
  interface ToastifyOptions {
    text: string;
    duration?: number;
    selector?: string;
    destination?: string;
    newWindow?: boolean;
    close?: boolean;
    gravity?: "top" | "bottom";
    position?: "left" | "center" | "right";
    backgroundColor?: string;
    stopOnFocus?: boolean;
    onClick?: () => void;
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
    avatar?: string;
    offset?: { x: number; y: number };
  }

  interface Toastify {
    (options: ToastifyOptions): {
      showToast: () => void;
    };
  }

  const toastify: Toastify;
  export default toastify;
}
