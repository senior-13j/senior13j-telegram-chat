import { observer } from 'mobx-react-lite';
import { createRef, useEffect } from 'react';
import { domElementsStore } from '../../stores/domElementsStore';
import { mainStore } from '../../stores/mainStore';
import { Header } from '../Header/Header';
import { MessageComponent } from '../Message/Message';
import styles from './main.module.css';

export const Main = observer(() => {
  const mainRef = createRef<HTMLDivElement>();
  const messagesInnerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    domElementsStore.initializeMain(mainRef);
    domElementsStore.initializeMessagesInner(messagesInnerRef);
  }, [mainRef, messagesInnerRef]);

  return (
    <div className={styles.main} ref={mainRef}>
      <Header />
      <div className={styles.messages}>
        <div className={styles.inner} ref={messagesInnerRef}>
          {mainStore.messages.map((message, index) => {
            return <MessageComponent message={message} key={`${message.text || message.authorAvatarURL?.length}-index${index}`} />
          })}
        </div>
      </div>
    </div>
  );
});