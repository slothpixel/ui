import React from 'react';
import { addCommas } from '../../utility';
import { playerColumns } from '../Player/playerColumns';

function customColumns(fields, strings) {
  return fields.map(field => ({
    displayName: field,
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

export default function leaderboardColumns(fields, strings) {
  return [
    {
      displayName: '#',
      displayFn: (row, col, field, index) => index + 1,
    },
    ...playerColumns(strings),
    ...customColumns(fields, strings),
  ];
}
