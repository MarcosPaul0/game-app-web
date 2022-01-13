import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string;
}

export function Input({ error, ...rest }: InputProps) {
  return (
    <div className={styles.container}>
      <input 
        { ...rest }
      />
      { error && <p>{ error }</p> }
    </div>
  )
}