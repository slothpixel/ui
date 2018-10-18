/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import styled from 'styled-components';
import constants from '../../constants';

const StyledDrawer = styled(Drawer)`
  background-color: ${constants.defaultPrimaryColor} !important;
`;

const StyledMenuItem = styled(MenuItem)`
  display: block;
`;

export default class BurgerMenu extends React.Component {
  static propTypes = {
    menuItems: PropTypes.arrayOf({}),
  };

  constructor() {
    super();
    this.state = { open: false };
    const { open } = this.state;
    this.handleToggle = () => this.setState({ open: !open });
    this.handleClose = () => this.setState({ open: false });
  }

  render() {
    const { menuItems } = this.props;
    const { open } = this.state;
    return (
      <div>
        <IconButton onClick={this.handleToggle}>
          <MenuIcon />
        </IconButton>
        <StyledDrawer
          docked={false}
          width={260}
          open={open}
          onRequestChange={open => this.setState({ open })}
        >
          <Menu>
            {menuItems.map((item) => {
              const linkElement = React.cloneElement(item, { style: { width: '100%', display: 'block' } });
              return (
                <StyledMenuItem key={item.key} onClick={this.handleClose}>
                  {linkElement}
                </StyledMenuItem>
              );
            })}
          </Menu>
        </StyledDrawer>
      </div>
    );
  }
}
