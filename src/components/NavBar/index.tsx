import styles from './styles.module.scss';

import { AiFillAccountBook, AiFillHome } from 'react-icons/ai';

import { NavLink } from './NavLink';
import { SingOutLinkButton } from './SignOutLinkButton';

export function NavBar() {
  return (
    <nav className={styles.container}>
      <NavLink Icon={AiFillHome} link="#" text="Início" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <SingOutLinkButton />
    </nav>
  )
}