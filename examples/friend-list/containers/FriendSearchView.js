import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';
import ErrorView from '../components/ErrorView';
import { setQuery, fetchFriends } from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    isFetching: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }).isRequired,
  search: PropTypes.shape({
    query: PropTypes.string,
    friends: PropTypes.array,
  }).isRequired,
};

const defaultProps = {
  search: { query: '', friends: [] },
};

class FriendSearch extends Component {
  constructor(props, context) {
    super(props, context);
    this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount() {
    this.unlisten = browserHistory.listen(location => {
      if (location.action === 'POP') {
        this.doSearch(location.query.q);
      }
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  doSearch(q) {
    const { dispatch } = this.props;

    dispatch(setQuery(q));
    dispatch(fetchFriends(browserHistory));
  }

  renderErrorView() {
    const { meta: { error } } = this.props;
    return <ErrorView message={error.message} />;
  }

  renderFriendList() {
    const { meta: { isFetching }, search: { friends } } = this.props;
    return <FriendList isFetching={isFetching} friends={friends} />;
  }

  render() {
    const { meta: { error }, search: { query } } = this.props;
    return (
      <div className="app">
        <SearchInput
          placeholder="Search friends..."
          value={query}
          doSearch={this.doSearch}
        />
        {error ? this.renderErrorView() : this.renderFriendList()}
      </div>
    );
  }
}

FriendSearch.propTypes = propTypes;
FriendSearch.defaultProps = defaultProps;

export default connect(({ meta, search }) => ({
  meta,
  search,
}))(FriendSearch);
