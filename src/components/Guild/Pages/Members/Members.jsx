import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from '../../../Table';
import Container from '../../../Container';
import guildMembersColumns from './guildMembersColumns';

const Members = ({
  data, error, loading, strings,
}) => (
  <Container title={strings.guild_members} error={error} loading={loading}>
    <Table columns={guildMembersColumns(strings)} data={data} placeholderMessage={'owo'} />
  </Container>
);

Members.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

function RequestLayer(props) {
  return <Members {...props} />;
}

function transformMembers(data) {
  // TODO - Change rank to object with reverse priority so ranks can be sorted properly
  const arr = [];
  data.members.forEach((member) => {
    const newMember = Object.assign(member, member.profile);
    delete newMember.profile;
    arr.push(newMember);
  });
  return arr;
}

const mapStateToProps = state => ({
  data: transformMembers(state.app.guild.data),
  strings: state.app.strings,
});

export default connect(mapStateToProps)(RequestLayer);
