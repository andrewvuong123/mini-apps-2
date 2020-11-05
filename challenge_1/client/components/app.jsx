import React from 'react';
import axios from 'axios';
import Events from './events.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: '',
      offset: 0,
      perPage: 10
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadEventsFromServer = this.loadEventsFromServer.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      query: event.target.value
    })
    event.preventDefault();
  };

  handleSubmit(event) {
    // get page count from all queries returned
    axios.get(`/events?q=${this.state.query}`)
      .then(res => {
        this.setState({
          pageCount: Math.ceil(res.data.length / this.state.perPage)
        }, this.loadEventsFromServer());
      });
    event.preventDefault();
  };

  loadEventsFromServer() {
    // get limited results for each page
    axios.get(`/events?q=${this.state.query}&_page=${this.state.offset}&_limit=10`)
      .then(response => {
        this.setState({
          data: response.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset }, () => {
      this.loadEventsFromServer();
    });
  };

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
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed = {2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
        <Events events={this.state.data} />
      </div>
    )
  }
}

export default App;