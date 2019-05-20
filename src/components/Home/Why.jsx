import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconOpenSource, IconStats, IconCompass } from '../Icons';
import constants from '../constants';

const StyledDiv = styled.div`
  margin: 50px auto 150px;
  text-align: center;
  max-width: 1920px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  & .whyList {
    display: flex;
    justify-content: space-around;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
    & .whyElement {
      max-width: 25%;
      box-sizing: border-box;
      padding: 0 0.5rem;
      @media only screen and (max-width: 768px) {
        max-width: 100%;
        margin-bottom: 30px;
      }
      & svg {
        width: 85px;
        height: 85px;
        fill: ${constants.blue};
      }
      & .headline {
        font-size: 24px;
        line-height: 2;
      }
      & .description {
        font-weight: ${constants.fontWeightLight};
        line-height: 1.5;
        color: rgb(190, 190, 190);
      }
    }
  }
`;

const Why = ({ strings }) => (
  <StyledDiv>
    <div className="whyList">
      <div className="whyElement">
        <IconOpenSource />
        <div className="headline">
          {strings.home_opensource_title}
        </div>
        <div className="description">
          {strings.home_opensource_desc}
        </div>
      </div>
      <div className="whyElement">
        <IconStats />
        <div className="headline">
          {strings.home_indepth_title}
        </div>
        <div className="description">
          {strings.home_indepth_desc}
        </div>
      </div>
      <div className="whyElement">
        <IconCompass />
        <div className="headline">
          {strings.home_tracking_title}
        </div>
        <div className="description">
          {strings.home_tracking_desc}
          <p>
            <b>
              {strings.home_coming_soon}
            </b>
          </p>
        </div>
      </div>
    </div>
  </StyledDiv>
);

Why.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Why);
