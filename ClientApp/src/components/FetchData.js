import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { frogs: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
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

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderfrogsTable(this.state.frogs);

    return (
      <div>
        <h1 id="tabelLabel" >Frog details</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('froglocation');
    const data = await response.json();
    this.setState({ frogs: data, loading: false });
  }
}
