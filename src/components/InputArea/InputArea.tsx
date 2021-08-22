import { observer } from 'mobx-react-lite';
import { useEffect, useState, useContext, useRef } from 'react';
import { domElementsStore } from '../../stores/domElementsStore';
import { mainStore } from '../../stores/mainStore';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Stickers } from '../Stickers/Stickers';
import dayjs from 'dayjs';
import styles from './input-area.module.css';
import attachment from '../../assets/attachment.png';
import stickers from '../../assets/stickers.png';
import sent from '../../assets/sent.png';
import mic from '../../assets/mic.png';

export const InputArea = observer(() => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const inputPlaceholder = 'Write a message...';
  const [message, setMessage] = useState<string>('');

  const { auth } = useContext<any>(Context);
  const [user] = useAuthState(auth);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const reRenderComponents = () => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "20px";
    const newHeight = `${inputRef.current.scrollHeight}px`;
    domElementsStore.updateAllElementsHeight(newHeight);
  };

  const resizeHandler = () => {
    reRenderComponents();
  };

  const autoGrow = () => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "20px";
    const newLengthString = `${inputRef.current.scrollHeight}px`;
    inputRef.current.style.height = Number.parseInt(newLengthString) >= 45 ? newLengthString : '20px';
    domElementsStore.updateAllElementsHeight(newLengthString);
  };

  const handleSending = () => {
    mainStore.addMessageToChat('text', dayjs(), message, user?.displayName ?? '', user?.photoURL ?? '');
    setMessage('');
    // reRender with default height of input area
    domElementsStore.updateAllElementsHeight('30px');
  };

  const handlePressEnter = (event: any) => {
    const keyCode = event.code || event.key;
    if (keyCode === 'Enter') {
      handleSending();
      event.target.blur();
    }
  };

  useEffect(() => {
    domElementsStore.initializeArea(areaRef);
    domElementsStore.initializeInput(inputRef);
    window.addEventListener('resize', resizeHandler, false);
    return () => {
      window.removeEventListener('resize', resizeHandler, false);
    }
    /* eslint-disable-next-line*/
  }, [areaRef, inputRef]);

  return (
    <div className={styles.area} ref={areaRef}>
      <div className={styles.leftCol}>
        <button><img loading="lazy" className={styles.icon} src={attachment} alt={'attach icon'} /></button>
        <textarea
          rows={1}
          value={message}
          ref={inputRef}
          className={styles.input}
          placeholder={inputPlaceholder}
          onChange={(event) => {
            autoGrow();
            setMessage(event.target.value)
          }}
          onKeyPress={handlePressEnter} />
      </div>
      <div className={styles.rightCol}>
        <button> <img loading="lazy" className={styles.icon} src={stickers} alt={'stickers icon'} onMouseEnter={() => {
          setTimeout(() => {
            openModal()
          }, 100)
        }} /></button>
        {message.length ?
          <button><img loading="lazy" className={styles.icon} src={sent} alt={'sent icon'} onClick={handleSending} /></button>
          :
          <button><img loading="lazy" className={styles.icon} src={mic} alt={'mic icon'} /></button>}
      </div>
      <Stickers isOpen={modalIsOpen} setModal={setIsOpen} />
    </div>
  )
});