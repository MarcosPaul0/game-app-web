import styles from '../styles/home.module.scss';
import { useState } from 'react';

import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { Assessment } from '../components/Assessment';

export default function Home() {
  const [navBarIsActive, setNavBarIsActive] = useState(false);

  return (
    <main className={styles.container}>
      <Header 
        toggleMenu={() => setNavBarIsActive(!navBarIsActive)}
      />
      <div className={styles.content}>
        { navBarIsActive && <NavBar /> }
        <div className={styles.assessments}>
          <Assessment />
        </div>
      </div>
    </main>
  )
}