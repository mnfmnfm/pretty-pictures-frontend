import axios from 'axios';
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }
  onFormSubmit = async (e) => {
    e.preventDefault();
    let pictureData = await axios.get(`http://localhost:3002/pictures?searchQuery=${e.target.query.value}`);

    console.log(pictureData);

    this.setState({
      pictures: pictureData.data
    });
  }
  render() {
    return (
      <>
        <h1>Pretty Pictures!</h1>
        <form onSubmit={this.onFormSubmit}>
          <input id="query" />
          <input type="submit" value="search for pretty pictures" />
          {this.state.pictures ? 
            this.state.pictures.map(picture => <img key={picture.urls.full} src={picture.urls.thumb} alt={picture.description}/>)
          : ''}
        </form>
      </>
    )
  }
}

export default App;
