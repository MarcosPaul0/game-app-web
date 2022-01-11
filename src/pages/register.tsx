import styles from '../styles/register.module.scss';
import { FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

import principalImg from '../assets/principal.svg';
import logoImg from '../assets/logo.svg';

export default function Register() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <>
    <Head>
      <title>Zombie Games | Registrar</title>
    </Head>

    <main className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>Ajude a comunidade Gamer</h1>
        <h2>Avalie e indique jogos</h2>
        <Image src={principalImg} />
      </div>
      <div className={styles.formContainer}>
        <form>
          <Image 
            src={logoImg} 
            height={90} 
          />
          <Input 
            type="email"
            placeholder="Email"
          />
          <Input 
            type="password"
            placeholder="Senha"
          /> 
          <Input 
            type="password"
            placeholder="Confirmação de senha"
          /> 
          <Button 
            text="Registrar"
            type="submit"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </main>
  </>
  )
}