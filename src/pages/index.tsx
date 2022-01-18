import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { withSSRGuest } from '../utils/withSSRGuest';
import styles from '../styles/login.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

import principalImg from '../assets/principal.svg';
import logoImg from '../assets/logo.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    signIn({
      email,
      password
    });
  }

  return (
    <>
      <Head>
        <title>Zombie Games | Login</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.contentContainer}>
          <h1>Ajude a comunidade Gamer</h1>
          <h2>Avalie e indique jogos</h2>
          <Image src={principalImg} />
        </div>
   
        <div className={styles.formContainer}>
          <form className={styles.formContainer}>
            <Image src={logoImg} height={90} />
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            /> 
            <Button 
              text="Entrar"
              type="submit"
              onClick={handleSubmit}
            />
            <Link href="/register">Registrar-se</Link>
          </form>
        </div>
      </main>
    
      <ToastContainer />
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});