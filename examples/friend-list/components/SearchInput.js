import React, { PropTypes } from 'react';

const ENTER_KEYCODE = 13;

const propTypes = {
  value: PropTypes.string,
  doSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
};

function SearchInput(props) {
  const { value, doSearch } = props;

  const onChange = e => doSearch(e.target.value);
  const onKeyDown = e => {
    if (e.keyCode === ENTER_KEYCODE) {
      doSearch(e.target.value);
    }
  };

  return (
    <input
      {...props}
      type="search"
      id="search-input"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
