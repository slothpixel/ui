import React from 'react';
//import Buttons from './Buttons';
import Why from './Why';
import HomeSearch from './HomeSearch';
import { HeadContainerDiv, HeadlineDiv, DescriptionDiv } from './Styled';

const Home = ({ strings }) => (
  <div>
    <HeadContainerDiv>
      <HeadlineDiv>
        {'Slothpixel.me'}
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

export default Home;