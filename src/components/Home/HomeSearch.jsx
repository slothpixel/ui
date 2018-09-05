import React from 'react';

const HomeSearch = ({ strings }) => (
  <div>
    <form action="/stats/" method="get">
      <input type="text" className="search-box" name="search" placeholder="Player Name/UUID"
      style={{width: 250, height: 45, backgroundColor: 'rgba(0,0,0,.6)', paddingLeft: 40, backgroundImage: 'url(' + '/assets/search.svg' + ')', backgroundSize: 20 }}/>
    </form>
  </div>
);

export default HomeSearch;