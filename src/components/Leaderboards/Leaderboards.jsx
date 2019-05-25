import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Table from '../Table';
import Container from '../Container';
import { getLeaderboard } from '../../actions';
import { leaderboardPlayerColumns, leaderboardGuildColumns } from './leaderboardColumns';

const MenuItem = styled.div`
  height: 42px;
  line-height: 1.3;
  font-size: 14px;
  margin: 0 70px;
  & p {
    margin: 0;
  }
`;

// const LeadeboardMenu = () => (
//   <div style={{
//     position: 'fixed', backgroundColor: 'black', height: '100%', width: '320px',
//   }}
//   >
//     <p>text</p>
//   </div>
// );

const Items = ({
  data,
  columns,
  error,
  loading,
  name,
  templateData = {},
  strings,
}) => (
  <Container title={`Leaderboard - ${name}`} error={error} loading={loading} style={{ minHeight: '660px' }}>
    <Table
      paginated
      columns={columns}
      data={data}
    />
  </Container>
);

const getData = (props) => {
  props.getLeaderboard(props.match.params.template);
};

class Leaderboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'general',
    };
  }


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

  handleClick = (name) => {
    console.log(`Clicked ${name}`);
    this.setState({
      active: name,
    });
  };

  render() {
    let templateData = {};
    let name = '';
    let columns = '';
    const { template } = this.props.match.params;
    const { templates, loading, strings } = this.props;
    const { active } = this.state;
    const [type, subtype] = template.split('_');
    if (!loading) {
      templateData = templates[type].items[subtype];
      name = `${templates[type].name} - ${templates[type].items[subtype].name}`;
      columns = (type === 'guild')
        ? leaderboardGuildColumns(strings)
        : leaderboardPlayerColumns(templateData.fields || [], strings);
    }

    return (
      <div>
        <div style={{
          position: 'fixed', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', width: '320px', zIndex: 0, left: 0, top: 0, overflow: 'auto',
        }}
        >
          <div style={{ marginTop: '156px' }}>
            {Object.keys(templates).map((category) => {
              const object = templates[category];
              return (
                <div>
                  <MenuItem
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => this.handleClick(category)}
                    onKeyPress={() => this.handleClick(category)}
                  >
                    <p style={{
                      color: active === category ? 'white' : 'gray',
                    }}
                    >
                      {`[X] ${object.name}`}
                    </p>
                  </MenuItem>
                  {active === category
                    ? Object.keys(object.items).map((item) => {
                      const x = object.items[item];
                      return (
                        <MenuItem>
                          <p>{`    ${x.name}`}</p>
                        </MenuItem>
                      );
                    })
                    : null
                  }
                </div>
              );
            })}
          </div>
        </div>
        <Items {...this.props} templateData={templateData} name={name} columns={columns} />
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
