import axios from 'axios';
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    console.log('before the axios.get');
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/pictures?searchQuery=${e.target.query.value}`)
      .then(pictureData => {
        console.log('inside of the .then');
        console.log(pictureData);
    
        this.setState({
          pictures: pictureData.data
        });
      })
      .catch(err => {
        console.log('there was an error', err);
      })
    console.log('after the axios.get');
    // you cannot use pictureData here
    // the data is not back yet
    // the request is still happening
    // you will have a bad time
  }
  render() {
    return (
      <>
        <h1>Pretty Pictures!</h1>
        <form onSubmit={this.onFormSubmit}>
          <input id="query" />
          <input type="submit" value="search for pretty pictures" />
          {this.state.pictures ? 
            this.state.pictures.map(picture => <img key={picture.url} src={picture.url} alt={picture.description}/>)
          : ''}
        </form>
      </>
    )
  }
}

export default App;
