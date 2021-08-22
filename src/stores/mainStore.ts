import { makeAutoObservable } from "mobx";
import { Dayjs } from "dayjs";

export type Message = {
  text?: string,
  author?: string,
  authorAvatarURL?: string,
  sticker?: any;
  type: 'text' | 'sticker';
  date: Dayjs;
};
class MainStore {
  constructor() {
    makeAutoObservable(this);
  }

  messages: Message[] = [];

  addMessageToChat(
    type: 'text' | 'sticker',
    date: Dayjs,
    text?: string,
    author?: string,
    authorAvatarURL?: string,
    sticker?: any
  ) {
    const message = {
      text,
      author,
      authorAvatarURL,
      type,
      sticker,
      date
    };
    this.messages.unshift(message);
  }
}

export const mainStore = new MainStore();