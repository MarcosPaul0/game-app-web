import styles from '../styles/register.module.scss';
import Head from 'next/head';
import Image from 'next/image';

import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';

import principalImg from '../assets/principal.svg';
import logoImg from '../assets/logo.svg';
import { useUserRegister } from '../hooks/useUserRegister';

export default function Register() {
  const { 
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit
   } = useUserRegister();

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
            type="text"
            name="name"
            placeholder="Nome"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />
          <Input 
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <Input 
            type="password"
            name="password"
            placeholder="Senha"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          /> 
          <Input 
            type="password"
            name="confirmPassword"
            placeholder="Confirmação de senha"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
          /> 
          <Input 
            type="checkbox"
            name="is_developer"
            defaultChecked={values.is_developer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.is_developer}
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