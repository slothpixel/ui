import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../../Table';
import Container from '../../../../../Container';
import { StatFields } from '../../../../../../utility';
import gameModeColumns from './arenaStatColumns';

const fields = ['coins', 'coins_spent', null, 'magical_chest', 'keys', 'active_rune'];

const Arena = ({ strings, arenaData }) => {
  if (arenaData === undefined) {
    return <p>no data!</p>;
  }
  const gameModeData = [];
  const modes = Object.keys(arenaData.gamemodes);
  modes.forEach((mode) => {
    const row = arenaData.gamemodes[mode];
    row.type = mode;
    gameModeData.push(row);
  });
  return (
    <Container title="Arena Brawl">
      <StatFields strings={strings} fields={fields} data={arenaData} />
      <Container title={strings.heading_gamemodes}>
        <Table
          columns={gameModeColumns(modes, strings)}
          data={gameModeData}
        />
      </Container>
      <Container title={strings.heading_combat_levels}>
        <p>todo</p>
      </Container>
      <Container title={strings.heading_runes}>
        <p>todo</p>
      </Container>
    </Container>
  );
};

Arena.propTypes = {
  strings: PropTypes.shape({}),
  arenaData: PropTypes.shape({}),
};

export default Arena;
