import { createContext, ReactNode, useContext, useState } from 'react';
import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import styles from '../styles/home.module.scss';
import { AuthContext } from './AuthContext';

export const IndexContext = createContext({});

interface IndexContextProvider {
  children: ReactNode;
}

export function IndexContextProvider({ children }: IndexContextProvider) {
  const [navBarIsActive, setNavBarIsActive] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated)
  return (
    <IndexContext.Provider value={{}}>
      <main className={styles.container}>
        <Header 
          toggleMenu={() => setNavBarIsActive(!navBarIsActive)}
        />
        <div className={styles.content}>
          { navBarIsActive && <NavBar /> }
          { children }
        </div>
      </main>
    </IndexContext.Provider>
  )
}