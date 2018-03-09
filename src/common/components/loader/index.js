import React, {
  Component,
} from 'react';

import { getImageUrl } from '../../../common/utils';

class Loader extends Component {
  render() {
    return (
        <img
          src={getImageUrl('spinner.gif')}
          style={{ width: '40px', height: '40px',    position: 'relative',
          left: '87%', top: '-40px'}}
          alt="loader"
        />
    );
  }
}

export default Loader;
