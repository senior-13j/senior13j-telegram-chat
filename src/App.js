import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { useContext } from "react";
import { Context } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "./components/Loader/Loader";
import { UserAvatar } from "./components/UserAvatar/UserAvatar";
import styles from "./app.module.css";
import telegram from "./assets/telegram.png";

export const App = () => {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <h1>{error.message}</h1>;
  }

  return (
    <div className={styles.app}>
      <Router>
        <div className={styles.appHeader}>
          <div className={styles.logoContainer}>
            <img loading="lazy" src={telegram} alt={"telegram logo"} />
            <h2>Telegram</h2>
          </div>
          {user && (
            <div className={styles.avatarOptions}>
              <UserAvatar url={user.photoURL} />
              <button
                className={styles.signOut}
                onClick={() => {
                  auth.signOut();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
        <AppRouter />
      </Router>
    </div>
  );
};
