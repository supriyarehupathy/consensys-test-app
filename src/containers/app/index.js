import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { css } from 'aphrodite/no-important';

import dynamicComponent from './dynamicComponent'

import styles from './styles';

export default () => (
  <AppContainer>
    <Route path="/" component={dynamicComponent(() => import('../search'))} />
  </AppContainer>
);

@withRouter
class AppContainer extends React.Component {
  render() {
    const { children, } = this.props;
    return (
      <div className={css(styles.mainContainer)}>
        {children}
      </div>
    );
  }
}
