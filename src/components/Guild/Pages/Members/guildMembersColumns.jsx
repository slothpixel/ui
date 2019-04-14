import React from 'react';
import RenderUsername from '../../../RenderUsername';
import { getLocalizedDate } from '../../../../utility';

const playerColumns = strings => [{
  displayName: strings.th_skin,
  field: 'uuid',
  displayFn: row => (
    <img src={`https://crafatar.com/avatars/${row.uuid}?size=32&default=Steve&overlay`} alt="skin" />
  ),
}, {
  displayName: strings.th_username,
  field: 'username',
  displayFn: row => (
    RenderUsername(row)
  ),
}];

const memberColumns = strings => [{
  displayName: strings.th_level,
  field: 'level',
  sortFn: true,
  displayFn: row => (
    Math.floor(row.level)
  ),
}, {
  displayName: strings.th_rank,
  field: 'rank',
  sortFn: true,
}, {
  displayName: strings.th_last_login,
  field: 'last_login',
  sortFn: true,
  displayFn: row => (
    getLocalizedDate(row.last_login)
  ),
}, {
  displayName: strings.th_joined,
  field: 'joined',
  sortFn: true,
  displayFn: row => (
    getLocalizedDate(row.joined)
  ),
}, {
  displayName: strings.th_quest_participation,
  field: 'quest_participation',
  sortFn: true,
}];

export default function guildMembersColumns(strings) {
  return [
    ...playerColumns(strings),
    ...memberColumns(strings),
  ];
}
