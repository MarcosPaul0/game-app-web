import styles from './styles.module.scss';
import { GoSignOut } from 'react-icons/go';
import { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface ButtonLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  link: string;
  text: string;
  Icon: IconType;
}

export function ButtonLink({ link, text, Icon, ...rest }: ButtonLinkProps) {
  return (
    <button 
      className={styles.container}
      { ...rest }
    >
      <Icon size={40} />
      { text }
    </button>
  )
}