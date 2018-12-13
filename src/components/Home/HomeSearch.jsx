import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';

class HomeSearch extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
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
    const { strings } = this.props;
    const { query } = this.state;
    return (
      <form onSubmit={this.formSubmit}>
        <TextField
          id="homeSearchField"
          hintText={strings.app_name_uuid}
          value={query}
          onChange={this.handleChange}
          fullWidth
          style={{
            width: 250, height: 45, paddingLeft: 15, backgroundColor: 'rgba(0,0,0,.6)',
          }}
          underlineStyle={{ left: 0, bottom: -1 }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default withRouter(connect(mapStateToProps)(HomeSearch));
