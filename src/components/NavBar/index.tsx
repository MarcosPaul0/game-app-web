import styles from './styles.module.scss';

import { AiFillAccountBook } from 'react-icons/ai';

import { NavLink } from './NavLink';

export function NavBar() {
  return (
    <nav className={styles.container}>
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
      <NavLink Icon={AiFillAccountBook} link="#" text="Teste" />
    </nav>
  )
}