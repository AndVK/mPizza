import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not found page
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет магазине
      </p>
    </div>
  );
};
