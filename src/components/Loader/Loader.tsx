import styles from './loader.module.css';
import loader from '../../assets/loader.svg';

export const Loader = () => (
  <div className={styles.loader}>
    <img loading="lazy" src={loader} alt="loader" />
  </div>
)