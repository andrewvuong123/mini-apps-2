import React from 'react';
import axios from 'axios';
import Events from './events.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      query: event.target.value
    })
    event.preventDefault();
  }

  handleSubmit(event) {
    axios.get(`/events?q=${this.state.query}`)
      .then((response) => {
        this.setState({
          data: response.data
        });
      })
      .catch(function (err) {
        console.log(err);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search History:
            <input value={this.state.value} onChange={this.handleInputChange} />
          </label>
          <button type="submit">Search</button>
        </form>
        <Events events={this.state.data} />
      </div>
    )
  }
}

export default App;