import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class List extends Component {
  constructor(props) {
    super(props);
  }

  getGistData(id) {
    this.props.store.getGistData(id);
  }

  render() {
    return (
      <section className="list__container">
        <div>
          {
            this.props.store.gists.map((gist, index) => {
              return (
                <div
                  key={gist.id}
                  className="list__gist"
                  onClick={() => this.getGistData(gist.id)}
                >
                  <p>{index+1}. Gist</p>
                  <p>Files: {Object.keys(gist.files).length}</p>
                  {gist.description !== '' &&
                    <p>Description: {gist.description}</p>
                  }
                  {this.props.store.checkIfGistContainsLabel(gist.id) &&
                    <div>
                      <p className="list__paragraph">Labels: </p>
                      {
                        this.props.store.gistsLabels.map((item) => {
                          if(item[gist.id]) {
                            return item[gist.id].map((label, index) => {
                              return (
                                <span key={index}>
                                  {" " + label}
                                </span>
                              )
                            })
                          }
                        })
                      }
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
      </section>
    );
  }
}

export default List;
