import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { frogs: [], loading: true };
  }

  componentDidMount() {
    this.populateFrogData();
  }

  static renderfrogsTable(frogs) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {frogs.map(frog =>
            <tr key={frog.date}>
              <td>{frog.date}</td>
              <td>{frog.latitude}</td>
              <td>{frog.longitude}</td>
              <td>{frog.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
    }

    static renderfrogAlerts(frogs) {
        return (
            <div>
                {frogs.map(frog =>
                    <p key={frog.date}>
                        {frogs.filter(frog => frog.status == "escaping")}
                    </p>
                )}
            </div>
        );
    }

    render() {
        let frogAlerts = this.state.loading
            ? <p></p>
            : FetchData.renderfrogAlerts(this.state.frogs);

        let frogTable = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderfrogsTable(this.state.frogs);

    return (
      <div>
      <h1 id="tabelLabel" >Frog details</h1>
            {frogAlerts}
            {frogTable}
      </div>
    );
  }

  async populateFrogData() {
    const response = await fetch('frogdata');
    const data = await response.json();
    this.setState({ frogs: data, loading: false });
  }
}
