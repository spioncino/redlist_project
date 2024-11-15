import { ReactNode } from 'react';
import css from './BigTextForHelper.module.css';

export const BigTextForHelper = ({ children }: { children: ReactNode }) => {
  return <h3 className={css.mainText}>{children}</h3>;
};
