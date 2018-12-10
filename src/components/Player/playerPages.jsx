import React from 'react';
import {
  StatsPage,
  AchievementsPage,
  QuestsPage,
} from './Pages';

const playerPages = strings => [{
  name: strings.tab_stats,
  key: 'stats',
  content: (playerId, routeParams, location) => (<StatsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_achievements,
  key: 'achievements',
  content: (playerId, routeParams, location) => (<AchievementsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_quests,
  key: 'quests',
  content: (playerId, routeParams, location) => (<QuestsPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: strings.tab_shops,
  key: 'shops',
  disabled: true,
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
