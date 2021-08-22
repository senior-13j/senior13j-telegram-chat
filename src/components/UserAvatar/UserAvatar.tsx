import { memo } from 'react';
import styles from './user-avatar.module.css';

export const UserAvatar = memo(({ url, isChatAvatar }: { url: string, isChatAvatar?: boolean }) => (
  <div className={styles.avatar}>
    <img loading="lazy" src={url} alt="user avatar" className={`${isChatAvatar ? styles.chatAvatar : ''}`} />
  </div>
))