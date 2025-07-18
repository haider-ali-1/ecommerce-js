import type { Product } from "../interfaces";
import type { Cart, User } from "../types";

const qs = <T extends Element>(selector: string): T => {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`missing element ${selector}`);
  return el;
};

const createEl = <T extends keyof HTMLElementTagNameMap>(
  el: T
): HTMLElementTagNameMap[T] => {
  return document.createElement(el);
};

const getUsers = (): User[] => {
  const value = localStorage.getItem("users");
  return value ? JSON.parse(value) : [];
};

const getCart = (): Cart[] => {
  const value = localStorage.getItem("cart");
  return value ? JSON.parse(value) : [];
};

const getProducts = (): Product[] => {
  const value = localStorage.getItem("products");
  return value ? JSON.parse(value) : [];
};

const setValue = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { qs, createEl, getUsers, setValue, getCart, getProducts };
