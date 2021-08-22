import { useContext } from 'react';
import { Context } from '../..';
import firebase from "firebase/app";
import styles from './login.module.css';

export const Login = () => {
  const { auth } = useContext<any>(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <button className={styles.button} onClick={login}>Sign in with Google</button>
      </div>
    </div>
  );
}