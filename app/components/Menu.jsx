import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="menu__container">

      </nav>
    );
  }
}

export default Menu;
