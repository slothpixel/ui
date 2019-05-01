import React from 'react';
import { getLocalizedDate } from '../../../../utility';
import { playerColumns } from '../../../Player/playerColumns';

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
