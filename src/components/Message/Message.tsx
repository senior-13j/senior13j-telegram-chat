import { UserAvatar } from "../UserAvatar/UserAvatar";
import { memo, useContext, useState } from "react";
import styles from "./message.module.css";
import checking from "../../assets/checking.png";
import dayjs from "dayjs";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

type MessageProps = {
  message: any;
};

export const Message = memo(({ message }: MessageProps) => {
  const [showStickerDate, setShowStickerDate] = useState(false);
  console.log("message", message);
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  if (user?.uid !== message.uid) {
    return message.type === "sticker" ? (
      <div className={styles.anotherUserMessage}>
        <div>
          <div
            className={styles.anotherUserStickerBody}
            onMouseOver={() => {
              setShowStickerDate(true);
            }}
            onMouseLeave={() => {
              setShowStickerDate(false);
            }}
          >
            <img
              loading="lazy"
              src={message.sticker}
              alt="sticker"
              className={styles.sticker}
            />
            <div
              className={`${
                showStickerDate
                  ? styles.anotherUserShowStickerDate
                  : styles.anotherUserHideStickerDate
              }`}
            >
              <span className={styles.anotherUserMessageTime}>
                {dayjs(message?.createdAt?.toDate()).format("hh:mm a")}
              </span>
              <span>
                <img
                  loading="lazy"
                  src={checking}
                  alt={"checking"}
                  className={styles.anotherUserChecking}
                />
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${styles.anotherUserAuthorAvatar} ${styles.anotherUserStickerAvatar}`}
        >
          <UserAvatar url={message.photoURL ?? ""} isChatAvatar />
        </div>
      </div>
    ) : (
      <div className={styles.anotherUserMessage}>
        <div className={styles.anotherUserMessageBody}>
          <p>{message.text}</p>
          <span className={styles.anotherUserMessageTime}>
            {dayjs(message?.createdAt?.toDate()).format("hh:mm a")}
          </span>
          <span>
            <img
              loading="lazy"
              src={checking}
              alt={"checking"}
              className={styles.anotherUserChecking}
            />
          </span>
        </div>
        <div className={styles.anotherUserAuthorAvatar}>
          <UserAvatar url={message.photoURL ?? ""} isChatAvatar />
        </div>
      </div>
    );
  } else {
    return message.type === "sticker" ? (
      <div className={styles.message}>
        <div className={`${styles.authorAvatar} ${styles.stickerAvatar}`}>
          <UserAvatar url={message.photoURL ?? ""} isChatAvatar />
        </div>
        <div>
          <div
            className={styles.stickerBody}
            onMouseOver={() => {
              setShowStickerDate(true);
            }}
            onMouseLeave={() => {
              setShowStickerDate(false);
            }}
          >
            <img
              loading="lazy"
              src={message.sticker}
              alt="sticker"
              className={styles.sticker}
            />
            <div
              className={`${
                showStickerDate
                  ? styles.showStickerDate
                  : styles.hideStickerDate
              }`}
            >
              <span className={styles.messageTime}>
                {dayjs(message?.createdAt?.toDate()).format("hh:mm a")}
              </span>
              <span>
                <img
                  loading="lazy"
                  src={checking}
                  alt={"checking"}
                  className={styles.checking}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.message}>
        <div className={styles.authorAvatar}>
          <UserAvatar url={message.photoURL ?? ""} isChatAvatar />
        </div>
        <div className={styles.messageBody}>
          <p>{message.text}</p>
          <span className={styles.messageTime}>
            {dayjs(message?.createdAt?.toDate()).format("hh:mm a")}
          </span>
          <span>
            <img
              loading="lazy"
              src={checking}
              alt={"checking"}
              className={styles.checking}
            />
          </span>
        </div>
      </div>
    );
  }
});
