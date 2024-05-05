import { FC, FormEvent } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  children: string;
  onClick?: (e: FormEvent) => void;
  type: 'primary' | 'back' | 'position';
};

export const Button: FC<ButtonProps> = ({children, onClick, type}) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
  )
}
