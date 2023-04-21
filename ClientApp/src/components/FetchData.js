import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;
    ILogger<FrogController> logger;

  constructor(props) {
    super(props);
    this.state = { frogs: [], loading: true };
  }

  componentDidMount() {
    this.populateFrogData();
    }

    static renderfrogsTable(frogs) {
    logger.LogTrace(`Frog ${frog.ID} is currently at latitude ${frog.latitude} and longitude ${frog.longitude}`);
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
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
            <>
                <br/>
                {frogs.filter(frog => frog.status == "Escaping").map(escapingFrog => (
                    <div className="alert">
                        There is an escaping frog at coordinates <em>{escapingFrog.latitude}, {escapingFrog.longitude}</em>!
                    </div>
                ))}
            </>
        );
    }

    updateFrogData = async () => {
        logger.LogDebug("Searching for frogs in database (and definitely not just randomly generating them!");
        await this.populateFrogData();
    }

    async populateFrogData() {
        const response = await fetch('frogdata');
        const data = await response.json();
        this.setState({ frogs: data, loading: false });
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
      <h1 id="tabelLabel">Frog details</h1>
            {frogAlerts}
            {frogTable}
            <button onClick={this.updateFrogData}>Update</button>
      </div>
    );
  }
}
