import React, {
  Component,
} from 'react';
import { css } from 'aphrodite/no-important';
import styles from './styles';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list,
    });
  }

  render() {
    const {
      list,
      customComponent,
      name,
      type,
      ...rest
    } = this.props,
      CustomComponent = customComponent;

    return (
      <div
        className={css(
          styles.container)}
      >
        {this.state.list.map((item, index) =>
          (<CustomComponent
            item={item}
            index={index}
            key={index}
            name={name || ''}
            {...rest}
          />))}
      </div>
    );
  }
}

class List extends Component {
  render() {
    return (
      <div>
        <Items {...this.props} />
      </div >
    );
  }
}

export default List;

