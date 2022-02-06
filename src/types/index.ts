export type MessageType = {
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  type: "text" | 'sticker';
  sticker?: any;
  createdAt: any;
};