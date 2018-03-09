import React, {
  Component,
} from 'react';

import { css } from 'aphrodite/no-important';
import styles from './styles';

const Message = () => {
  const { message } = this.props;
  return (
    <div className={css(styles.errorContainer)}>
      {message}
    </div>
  );
}

export default Message;
