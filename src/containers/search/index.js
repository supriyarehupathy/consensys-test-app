import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../common/store/actions';
import Header from '../../components/search/header';
import List from '../../common/components/list';

import styles from './styles';

class Search extends Component {
  handleOnSelectResult = (index, data) => {
    const { handleOnSetSelectedResult } = this.props;
    handleOnSetSelectedResult(index, data);
  }

  render() {
    const { textSearchResults: { results, isInProgress },
      selectedResult,
      onClearSelectedResult,
      onClearTextSearchResults,
      handleTextSearch } = this.props;
    return (
      <div className={css(styles.container)}>
        <Header
          onClearSelectedResult={() => onClearSelectedResult()}
          onClearTextSearchResults={() => onClearTextSearchResults()}
          handleTextSearch={(text) => handleTextSearch(text)}
          isInProgress={isInProgress} />
        {results.length ?
          <div>
            <div className={css(styles.listContainer)}>
              <h3> Results </h3>
              <ul>
                <List
                  list={results}
                  customComponent={VideoTitle}
                  handleOnSelectResult={this.handleOnSelectResult}
                  name="textResult"
                />
              </ul>
            </div>
            <VideoDetails selectedResult={selectedResult} />
          </div>
          :
          null
        }
      </div>
    );
  }
}

Search.propTypes = {
  textSearchResults: PropTypes.object,
  selectedResult: PropTypes.object,
};

Search.defaultProps = {
  textSearchResults: {},
  selectedResult: {},
};

const mapStateToProps = state => ({
  textSearchResults: state.textSearchResults,
  selectedResult: state.selectedResult,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);


const VideoTitle = (props) => {
  const handleOnClick = () => {
    const { handleOnSelectResult, item, index } = props;
    handleOnSelectResult(index, item);
  }
  return (<li onClick={handleOnClick}> {props.item.snippet.title} </li>)
}

const VideoDetails = (props) => {
  return (props.selectedResult.data && props.selectedResult.data.snippet ?
    <div className={css(styles.detailsContainer)}>
      <h3> Results </h3>
      <div>
        <span className={css(styles.heading)}> Title: </span>
        <span className={css(styles.description)}> {props.selectedResult.data.snippet.title} </span>
      </div>
      <div className={css(styles.gap)}>
        <span className={css(styles.heading)}> Description: </span>
        <span className={css(styles.description)}> {props.selectedResult.data.snippet.description}
        </span>
      </div>
    </div> : null)
}
