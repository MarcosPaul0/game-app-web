import Link from 'next/link';
import { IconType } from 'react-icons';
import styles from './styles.module.scss';

interface NavLinkProps {
  link: string;
  text: string;
  Icon: IconType;
}

export function NavLink({ link, text, Icon }: NavLinkProps) {
  return (
    <div className={styles.container}>
      <Link href={link}>
        <a>
          <Icon size={40} />
          { text }
        </a>
      </Link>
    </div>
  )
}