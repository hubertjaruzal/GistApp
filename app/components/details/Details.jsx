import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DetailsTop from './DetailsTop';
import DetailsBottom from './DetailsBottom';
import DetailsCode from './DetailsCode';

@observer
class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="details__container">
        {this.props.store.gist.id &&
          <DetailsTop store={this.props.store}/>
        }
        {this.props.store.gist.description !== '' &&
          <p>{this.props.store.gist.description}</p>
        }
        {this.props.store.gist.id &&
          <DetailsBottom store={this.props.store}/>
        }
        <DetailsCode store={this.props.store}/>
      </section>
    );
  }
}

export default Details;
