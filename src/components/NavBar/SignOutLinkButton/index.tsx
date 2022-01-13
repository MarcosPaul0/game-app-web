import styles from './styles.module.scss';
import { GoSignOut } from 'react-icons/go';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export function SingOutLinkButton() {
  const { signOut } = useContext(AuthContext);

  return (
    <button 
      className={styles.container}
      onClick={signOut}  
    >
      <GoSignOut size={40}/>
      Sair
    </button>
  )
}