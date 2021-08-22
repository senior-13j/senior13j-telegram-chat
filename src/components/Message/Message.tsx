import { Message } from '../../stores/mainStore';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { memo, useState } from 'react';
import styles from './message.module.css';
import checking from '../../assets/checking.png';

type MessageProps = {
  message: Message;
};

export const MessageComponent = memo(({ message }: MessageProps) => {

  const [showStickerDate, setShowStickerDate] = useState(false);

  return message.type === 'sticker' ? (
    <div className={styles.message}>
      <div className={`${styles.authorAvatar} ${styles.stickerAvatar}`}>
        <UserAvatar url={message.authorAvatarURL ?? ''} isChatAvatar />
      </div>
      <div>
        <div className={styles.stickerBody} onMouseOver={() => { setShowStickerDate(true) }}
          onMouseLeave={() => { setShowStickerDate(false) }}>
          <img loading="lazy" src={message.sticker} alt="sticker" className={styles.sticker} />
          <div className={`${showStickerDate ? styles.showStickerDate : styles.hideStickerDate}`}>
            <span className={styles.messageTime}>{message.date.format('hh:mm')}</span>
            <span><img loading="lazy" src={checking} alt={'checking'} className={styles.checking} /></span>
          </div>
        </div>
      </div>
    </div>
  )
    : (
      <div className={styles.message}>
        <div className={styles.authorAvatar}>
          <UserAvatar url={message.authorAvatarURL ?? ''} isChatAvatar />
        </div>
        <div className={styles.messageBody}>
          <p>{message.text}</p>
          <span className={styles.messageTime}>{message.date.format('hh:mm')}</span>
          <span><img loading="lazy" src={checking} alt={'checking'} className={styles.checking} /></span>
        </div>
      </div >
    )
})