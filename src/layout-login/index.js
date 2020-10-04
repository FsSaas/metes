import React from 'react';
import styles from './index.scss';

export default props => {
  let { children } = props;

  return (
    <div className={styles.login__layout}>
      <div className={styles['login__layout-content']}>
        {children}
      </div>
    </div>
  )
}
