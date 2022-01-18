import styles from './styles.module.scss';

import { AiFillHome } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { MdAssessment } from 'react-icons/md';

import { GoSignOut } from 'react-icons/go';
import { ButtonLink } from './ButtonLink';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink } from './NavLink';

export function NavBar() {
  const { user } = useContext(AuthContext);
  const { signOut } = useContext(AuthContext)

  return (
    <aside className={styles.container}>
      <NavLink Icon={AiFillHome} link="/" text="Início" />
      {user?.is_developer && <NavLink Icon={FaGamepad} link="/game" text="Meus Jogos" />}
      <ButtonLink Icon={MdAssessment} link="#" text="Minhas avaliações" onClick={signOut} />
      <ButtonLink Icon={GoSignOut} link="#" text="Sair" onClick={signOut} />
    </aside>
  )
}