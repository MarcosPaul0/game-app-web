import { useState } from 'react';
import { withSSRAuth } from '../utils/withSSRAuth';
import styles from '../styles/home.module.scss';
import Head from 'next/head';

import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { AssessmentList } from '../components/AssessmentList';

export default function Home() {
  const [navBarIsActive, setNavBarIsActive] = useState(false);

  return (
    <>
      <Head>
        <title>Zombie Games | Home</title>
      </Head>

      <main className={styles.container}>
        <Header 
          toggleMenu={() => setNavBarIsActive(!navBarIsActive)}
        />
        
        <div className={styles.content}>
          { navBarIsActive && <NavBar /> }
          <AssessmentList />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
}, {});