import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { setQuery, fetchFriends } from '../actions';
import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  query: PropTypes.string,
  friends: PropTypes.array,
};

const defaultProps = {
  query: '',
  friends: [],
};

// TODO: add error state to render
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

  render() {
    const { meta: { isFetching }, query, friends } = this.props;
    return (
      <div className="app">
        <SearchInput
          placeholder="Search friends..."
          value={query}
          doSearch={this.doSearch}
        />
        <FriendList
          isFetching={isFetching}
          friends={friends}
        />
      </div>
    );
  }
}

FriendSearch.propTypes = propTypes;
FriendSearch.defaultProps = defaultProps;

export default connect(({ meta, search }) => ({
  meta,
  query: search.query,
  friends: search.friends,
}))(FriendSearch);
