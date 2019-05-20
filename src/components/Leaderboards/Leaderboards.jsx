import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../Table';
import Container from '../Container';
import { getLeaderboard } from '../../actions';
import leaderboardColumns from './leaderboardColumns';


const LeadeboardMenu = () => (
  <div style={{
    position: 'fixed', backgroundColor: 'black', height: '100%', width: '320px',
  }}
  >
    <p>text</p>
  </div>
);

const Items = ({
  data,
  error,
  loading,
  name,
  templateData = {},
  strings,
}) => (
  <Container title={`Leaderboard - ${name}`} error={error} loading={loading}>
    <Table
      paginated
      columns={leaderboardColumns(templateData.fields || [], strings)}
      data={data}
    />
  </Container>
);

const getData = (props) => {
  props.getLeaderboard(props.match.params.template);
};

class Leaderboards extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { template } = props.match.params;
    if (prevProps.match.params.template !== template) {
      getData(this.props);
    }
  }

  render() {
    let templateData = {};
    let name = '';
    const { template } = this.props.match.params;
    const { templates, loading } = this.props;
    const [type, subtype] = template.split('_');
    if (!loading) {
      templateData = templates[type].items[subtype];
      name = `${templates[type].name} - ${templates[type].items[subtype].name}`;
    }

    return (
      <div>
        <Items {...this.props} templateData={templateData} name={name} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  data: state.app.leaderboard.data,
  loading: state.app.leaderboard.loading || state.app.metadata.loading,
  error: state.app.leaderboard.error || state.app.metadata.error,
  templates: state.app.metadata.data.leaderboards || {},
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getLeaderboard: template => dispatch(getLeaderboard(template)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboards);
