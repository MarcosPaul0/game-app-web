import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

export function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      className={styles.container}
      { ...rest }
    />
  )
}