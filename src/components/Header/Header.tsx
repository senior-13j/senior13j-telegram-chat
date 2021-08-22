import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import styles from './header.module.css';
import phone from '../../assets/phone.png';
import search from '../../assets/search.png';
import dots from '../../assets/dots.png';

export const Header = () => {
  const { auth } = useContext<any>(Context);
  const [user] = useAuthState(auth);

  return (
    <div className={styles.header}>
      <div className={styles.leftCol}>
        <UserAvatar url={user?.photoURL ?? ''} />
        <div className={styles.info}>
          <span className={styles.headerName}>{user?.displayName}</span>
          <span className={styles.headerStatus}>last seen recently</span>
        </div>
      </div>
      <div className={styles.rightCol}>
        <button><img loading="lazy" className={styles.icon} src={phone} alt={'phone icon'} /></button>
        <button><img loading="lazy" className={styles.icon} src={search} alt={'search icon'} /></button>
        <button><img loading="lazy" className={styles.icon} src={dots} alt={'dots icon'} /></button>
      </div>
    </div>
  );
}