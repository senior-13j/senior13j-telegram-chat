import { Dispatch, SetStateAction, useContext, memo } from 'react';
import { Modal } from '../Modal/Modal';
import { mainStore } from '../../stores/mainStore';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import dayjs from 'dayjs';
import styles from './stickers.module.css';
import senya from '../../stickers/senya.webp';
import lady_vampire from '../../stickers/lady_vampire.webp';
import rickandmorty from '../../stickers/rickandmorty.webp';
import santa from '../../stickers/santa.webp';
import trump from '../../stickers/trump.webp';
import flame from '../../stickers/flame.webp';
import teacher from '../../stickers/teacher.webp';
import shaun from '../../stickers/shaunthesheep.webp';
import jessica from '../../stickers/jessica.webp';

export const Stickers = memo(({ isOpen, setModal }: { isOpen: boolean, setModal: Dispatch<SetStateAction<boolean>> }) => {

  const { auth } = useContext<any>(Context);
  const [user] = useAuthState(auth);

  const closeModal = () => {
    setModal(false);
  };

  const stickers = [senya, lady_vampire, rickandmorty, santa, trump, flame, teacher, shaun, jessica];

  const chooseSticker = (index: number) => {
    const sticker = stickers.find((item, i) => { return index === i });
    mainStore.addMessageToChat('sticker', dayjs(), '', '', user?.photoURL ?? '', sticker);
    closeModal();
  };

  return (
    <div className={styles.stickers}>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className={styles.modal}>
          {stickers.map((sticker, index) => <div key={`${Math.random() + sticker.length}-index${index}`}><img loading="lazy" src={sticker} alt={`${sticker} sticker`} onClick={() => { chooseSticker(index) }} className={styles.sticker} /></div>)}
        </div>
      </Modal>
    </div>
  )
})