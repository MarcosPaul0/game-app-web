import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/home.module.scss';
import { FormEvent } from 'react';

import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

import principalImg from '../assets/principal.svg';
import logoImg from '../assets/logo.svg';

export default function Home() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
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
          <form>
            <Image src={logoImg} height={90} />
            <Input 
              type="email"
              placeholder="Email"
            />
            <Input 
              type="password"
              placeholder="Senha"
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
    </>
  )
}