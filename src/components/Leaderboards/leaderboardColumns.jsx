import React from 'react';
import RenderString from '../RenderUsername/RenderString';
import { addCommas, getLocalizedDate } from '../../utility';
import { playerColumns } from '../Player/playerColumns';

const positionColumn = {
  displayName: '#',
  displayFn: (row, col, field, index) => index + 1,
};

const guildColumns = strings => [{
  displayName: strings.guild_guild,
  field: 'name',
  displayFn: row => (
    RenderString(`&f${row.name} ${row.tag_color}[${row.tag}]`)
  ),
}, {
  displayName: strings.th_level,
  field: 'level',
  sortFn: true,
}, {
  displayName: strings.th_experience,
  field: 'exp',
  displayFn: row => (
    addCommas(row.exp)
  ),
  sortFn: true,
}, {
  displayName: strings.guild_legacy_rank,
  field: 'legacy_ranking',
  displayFn: row => (row.legacy_ranking === null
    ? '-'
    : addCommas(row.legacy_ranking)),
  sortFn: true,
}, {
  displayName: strings.guild_members,
  field: 'members',
  displayFn: row => (
    row.members.length
  ),
  sortFn: true,
}, {
  displayName: strings.guild_created,
  field: 'created',
  displayFn: row => (
    getLocalizedDate(row.created)
  ),
  sortFn: true,
}];

function customColumns(fields, strings) {
  return fields.map(field => ({
    displayName: strings[`th_${field}`] || field,
    field,
    sortFn: true,
    displayFn: (row) => {
      const value = row[field];
      const num = typeof value === 'number'
        ? addCommas(value)
        : value;
      return (
        <div>
          {num}
        </div>
      );
    },
  }));
}

export function leaderboardPlayerColumns(fields, strings) {
  return [
    positionColumn,
    ...playerColumns(strings),
    ...customColumns(fields, strings),
  ];
}

export function leaderboardGuildColumns(strings) {
  return [
    positionColumn,
    ...guildColumns(strings),
  ];
}
