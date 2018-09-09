import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Why from './Why';
import HomeSearch from './HomeSearch';
import { HeadContainerDiv, HeadlineDiv, DescriptionDiv } from './Styled';

const Home = ({ strings }) => (
  <div>
    <HeadContainerDiv>
      <HeadlineDiv>
        {strings.app_name}
      </HeadlineDiv>
      <DescriptionDiv>
        {'Open source Hypixel data platform'}
      </DescriptionDiv>
      <HomeSearch/>
      {/*<Buttons />*/}
    </HeadContainerDiv>
    <Why />
  </div>
);

Home.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Home);