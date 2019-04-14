import React from 'react';
import {
  MembersPage,
} from './Pages';

const playerPages = strings => [{
  name: strings.guild_members,
  key: 'members',
  content: (playerId, routeParams, location) => (<MembersPage playerId={playerId} routeParams={routeParams} location={location} />),
}, {
  name: 'Info',
  key: 'info',
  disabled: true,
  // content: (playerId, routeParams, location) => (null),
}, {
  name: 'Graphs',
  key: 'graphs',
  disabled: true,
  // content: (playerId, routeParams, location) => (null),
}];

export default (playerId, strings) => playerPages(strings).map(page => ({
  ...page,
  route: `/guilds/player/${playerId}/${page.key}`,
}));
