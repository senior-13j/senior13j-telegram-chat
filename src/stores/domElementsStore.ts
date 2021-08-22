import { makeAutoObservable } from "mobx";
import { RefObject } from "react";

class DomElementsStore {
  constructor() {
    makeAutoObservable(this);
  }

  input: RefObject<HTMLTextAreaElement> | null = null;
  main: RefObject<HTMLDivElement> | null = null;
  area: RefObject<HTMLDivElement> | null = null;
  messagesInner: RefObject<HTMLDivElement> | null = null;

  initializeInput(element: RefObject<HTMLTextAreaElement>) {
    this.input = element;
  }

  initializeMain(element: RefObject<HTMLDivElement>) {
    this.main = element;
    if (!this.main || !this.main.current) return;
    this.main.current.style.height = `${window.innerHeight - 90}px`;
  }

  initializeArea(element: RefObject<HTMLDivElement>) {
    this.area = element;
  }

  initializeMessagesInner(element: RefObject<HTMLDivElement>) {
    this.messagesInner = element;
  }

  updateAllElementsHeight(newHeight: string) {
    this.updateAreaHeight(newHeight);
    this.updateMainHeight();
    this.updateMessagesInnerHeight();
  }

  updateAreaHeight(newHeight: string) {
    if (!this.area || !this.area.current) return;
    if (!this.input || !this.input.current) return;
    if (!(Number.parseInt(newHeight) < 38)) {
      if (!(Number.parseInt(newHeight) < 45)) {
        this.area.current.style.height = newHeight;
      }
      this.input.current.style.height = newHeight;
    } else {
      // height params by default - look at css files
      this.area.current.style.height = '45px';
      this.input.current.style.height = '20px';
    }
  }

  updateMainHeight() {
    if (!this.main || !this.main.current) return;
    if (!this.area || !this.area.current) return;
    this.main.current.style.height = `${window.innerHeight - this.area?.current?.clientHeight - 45}px`;
  }

  updateMessagesInnerHeight() {
    if (!this.messagesInner || !this.messagesInner.current) return;
    if (!this.main || !this.main.current) return;
    // 65 px is for header component's height with all borders and gaps
    this.messagesInner.current.style.height = `${this.main?.current?.clientHeight - 65}px`;
  }
}

export const domElementsStore = new DomElementsStore();