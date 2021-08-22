import { useEffect } from 'react';
import { domElementsStore } from '../../stores/domElementsStore';
import { InputArea } from '../InputArea/InputArea';
import { Main } from '../Main/Main';
import styles from './chat.module.css';

export const Chat = () => {

  useEffect(() => {
    // reRender with default height of input area
    domElementsStore.updateAllElementsHeight('30px');
  }, []);

  return (
    <div className={styles.chat}>
      <Main />
      <InputArea />
    </div>
  )
}