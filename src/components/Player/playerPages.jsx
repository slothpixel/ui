import React from 'react';
import {
  StatsPage,
} from './Pages';

const playerPages = strings => [{
  name: strings.tab_stats,
  key: 'stats',
  content: (playerId, routeParams, location) => (<StatsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_achievements,
  key: 'achievements',
  disabled: true,
  // content: (playerId, routeParams, location) => (null),
}, {
  name: strings.tab_quests,
  key: 'quests',
  disabled: true,
  // content: (playerId, routeParams, location) => (null),
}, {
  name: strings.tab_matches,
  key: 'matches',
  disabled: true,
  // content: (playerId, routeParams, location) => (null),
}];

export default (playerId, strings) => playerPages(strings).map(page => ({
  ...page,
  route: `/players/${playerId}/${page.key}`,
}));
