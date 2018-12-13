import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import constants from '../constants';

class SearchForm extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
    small: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  formSubmit = (e) => {
    const { query } = this.state;
    const { history } = this.props;
    e.preventDefault();
    history.push(`/players/${query}`);
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      query: value,
    });
  };

  render() {
    const { strings, small } = this.props;
    const { query } = this.state;
    return (
      <form onSubmit={this.formSubmit}>
        <TextField
          id="searchField"
          hintText={strings.search_title}
          value={query}
          onChange={this.handleChange}
          fullWidth
          underlineFocusStyle={{
            borderColor: constants.primaryLinkColor,
            bottom: '-4px',
            left: '-40px',
            width: 'calc(100% + 40px)',
          }}
          style={{ width: small ? '150%' : '100%', whiteSpace: 'nowrap', overflow: 'hidden' }}
          underlineStyle={{ borderColor: 'transparent' }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
  small: state.browser.greaterThan.small,
});


export default withRouter(connect(mapStateToProps)(SearchForm));
