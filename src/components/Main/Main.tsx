import { observer } from "mobx-react-lite";
import { useContext, useEffect, useRef } from "react";
import { Context } from "../..";
import { domElementsStore } from "../../stores/domElementsStore";
import { Header } from "../Header/Header";
import { Message } from "../Message/Message";
import styles from "./main.module.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Loader } from "../Loader/Loader";

export const Main = observer(() => {
  const mainRef = useRef<HTMLDivElement>(null);
  const messagesInnerRef = useRef<HTMLDivElement>(null);
  const { firestore } = useContext(Context);

  useEffect(() => {
    domElementsStore.initializeMain(mainRef);
    domElementsStore.initializeMessagesInner(messagesInnerRef);
  }, [mainRef, messagesInnerRef]);

  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  // we scroll to the bottom of the container when we detect a new message added
  useEffect(() => {
    const container = messagesInnerRef?.current!;
    container.scrollTop = container.scrollHeight + 2000;
  }, [messages]);

  if (loading) {
    <Loader />;
  }

  return (
    <div className={styles.main} ref={mainRef}>
      <Header />
      <div className={styles.messages}>
        <div className={styles.inner} ref={messagesInnerRef}>
          {messages
            ? messages?.map((message, index) => {
                return <Message message={message} key={index} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
});
