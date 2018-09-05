import React from 'react';
import styled from 'styled-components';
import {IconOpenSource, IconStats, IconCompass} from '../Icons';
import constants from '../constants';

const StyledDiv = styled.div`
  margin: 50px auto 0;
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
        fill: ${constants.colorBlue};
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

const Why = ({strings}) => (
  <StyledDiv>
    <div className="whyList">
      <div className="whyElement">
        <IconOpenSource />
        <div className="headline">
          {'Open Source'}
        </div>
        <div className="description">
          {'All project code is open source and available for contributors to improve and modify.'}
        </div>
      </div>
      <div className="whyElement">
        <IconStats />
        <div className="headline">
          {'In-Depth Data'}
        </div>
        <div className="description">
          {'Slothpixel.me provides highly detailed data from players, guilds and boosters.'}
        </div>
      </div>
      <div className="whyElement">
        <IconCompass />
        <div className="headline">
          {'Match Tracking'}
        </div>
        <div className="description">
          {'Forge mod to collect advanced data from played matches.'}
        <p>
          <b>
            {'Coming Soon'}
          </b>
        </p>
        </div>
      </div>
    </div>
  </StyledDiv>
);

export default Why;