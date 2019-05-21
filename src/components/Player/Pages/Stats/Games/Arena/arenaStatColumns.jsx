import { addCommas } from '../../../../../../utility';

const gamemodeColumns = (mode, strings) => [{
  displayName: 'Type',
  field: 'type',
  displayFn: row => strings[`heading_${row.type}`],
  sortFn: true,
}, {
  displayName: strings.th_wins,
  field: 'wins',
  displayFn: row => addCommas(row.wins),
  sortFn: true,
}, {
  displayName: strings.th_losses,
  field: 'losses',
  displayFn: row => addCommas(row.losses),
  sortFn: true,
}, {
  displayName: strings.th_kills,
  field: 'kills',
  displayFn: row => addCommas(row.kills),
  sortFn: true,
}, {
  displayName: strings.th_deaths,
  tooltip: strings.tooltip_deaths,
  field: 'deaths',
  displayFn: row => addCommas(row.deaths),
  sortFn: true,
}, {
  displayName: strings.th_kill_death,
  tooltip: strings.th_kill_death,
  field: 'kd',
  sortFn: true,
}, {
  displayName: strings.th_win_loss,
  tooltip: strings.tooltip_win_loss,
  field: 'win_loss',
  sortFn: true,
}, {
  displayName: strings.th_winrate,
  field: 'win_percentage',
  percentBars: true,
  sortFn: true,
}, {
  displayName: strings.th_damage,
  field: 'damage',
  displayFn: row => addCommas(row.damage),
  sortFn: true,
}, {
  displayName: strings.th_healed,
  field: 'healed',
  displayFn: row => addCommas(row.healed),
  sortFn: true,
}];

const gameModeColumns = (modes, strings) => [
  ...gamemodeColumns(modes, strings),
];

export { gameModeColumns as default };
