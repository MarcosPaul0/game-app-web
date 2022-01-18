import { useState } from 'react';
import { withSSRAuth } from '../utils/withSSRAuth';
import styles from '../styles/home.module.scss';
import Head from 'next/head';

import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { GameList } from '../components/GameList';

export default function Game() {
  const [navBarIsActive, setNavBarIsActive] = useState(false);

  return (
    <>
      <Head>
        <title>Zombie Games | Meus Jogos</title>
      </Head>

      <main className={styles.container}>
        <Header 
          toggleMenu={() => setNavBarIsActive(!navBarIsActive)}
        />
        
        <div className={styles.content}>
          { navBarIsActive && <NavBar /> }
          <GameList />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
}, {
  isDeveloper: true
});