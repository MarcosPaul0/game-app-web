import styles from './styles.module.scss';
import Image from 'next/image';

import { AiOutlineMenu } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import logoImg from '../../assets/logo.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { memo, useContext } from 'react';

interface HeaderProps {
  toggleMenu: () => void;
}

export function Header({ toggleMenu }: HeaderProps) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <div className={styles.firstContent}>
        <button onClick={toggleMenu}>
          <AiOutlineMenu size={50} color="#c4c4c4" />
        </button>
        <div>
          <Image src={logoImg} />
        </div>
      </div>
      <form className={styles.middleContent}>
        <input type="text" placeholder="Buscar avaliação" />
        <button type="submit">
          <BsSearch size={30} color="#c4c4c4" />
        </button>
      </form>
      <div className={styles.lastContent}>
        <div className={styles.text}>
          <span>{user?.name}</span>
          <button
            onClick={signOut}
          >
            Sair
          </button>
        </div>
        <div className={styles.avatar}>
          { user?.avatar_url ? (
            <img src={user?.avatar_url} />
          ) : (
            <span>{user?.name.slice(0, 1)}</span>
          )}
        </div>
      </div>
    </header>
  )
}