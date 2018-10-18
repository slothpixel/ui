import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const HomeSearch = ({ strings }) => (
  <div>
    <form action="/stats/" method="get">
      <input
        type="text"
        className="search-box"
        name="search"
        placeholder={strings.app_name_uuid}
        style={{
          width: 250, height: 45, backgroundColor: 'rgba(0,0,0,.6)', paddingLeft: 40, backgroundImage: 'url(/assets/search.svg)', backgroundSize: 20,
        }}
      />
    </form>
  </div>
);

HomeSearch.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(HomeSearch);
