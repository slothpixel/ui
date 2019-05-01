import React from 'react';
import { TableLink } from '../Table';
import RenderUsername from '../RenderUsername';

export const playerColumns = strings => [{
  displayName: strings.th_skin,
  field: 'uuid',
  displayFn: row => (
    <TableLink to={`/players/${row.username}`}>
      <img src={`https://crafatar.com/avatars/${row.uuid}?size=32&default=Steve&overlay`} alt="skin" />
    </TableLink>
  ),
}, {
  displayName: strings.th_username,
  field: 'username',
  displayFn: row => (
    <div>
      <TableLink to={`/players/${row.username}`}>
        {RenderUsername(row)}
      </TableLink>
    </div>
  ),
}];

export { playerColumns as default };
