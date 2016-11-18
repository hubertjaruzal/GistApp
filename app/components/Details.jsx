import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="details__container">
        <h2>Details</h2>
        <p>{this.props.gist.id}</p>
      </section>
    );
  }
}

export default Details;
