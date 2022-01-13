import styles from '../styles/home.module.scss';
import { useContext, useEffect, useState } from 'react';

import { Header } from '../components/Header';
import { NavBar } from '../components/NavBar';
import { withSSRAuth } from '../utils/withSSRAuth';
import { AssessmentList } from '../components/AssessmentList';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';

export default function Home() {
  const [navBarIsActive, setNavBarIsActive] = useState(false);

  const { setUser, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('/users/me')
      .then(response => setUser(response.data))
      .catch(() => signOut());
  }, [])

  return (
    <main className={styles.container}>
      <Header 
        toggleMenu={() => setNavBarIsActive(!navBarIsActive)}
      />
      <div className={styles.content}>
        { navBarIsActive && <NavBar /> }
        <AssessmentList />
      </div>
    </main>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
}, {})