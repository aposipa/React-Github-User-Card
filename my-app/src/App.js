import React from 'react';
import axios from 'axios';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import './App.css';

const imgStyle = {
  borderRadius: '50%',
}

const myCardStyle = {
  backgroundColor: 'coral',
  color: 'purple'
}

const cardStyle = {
  backgroundColor: 'aquamarine'
}

class App extends React.Component {

  state = {
    users: [],
    myself: {}
  };

  componentDidMount() {
    axios.get('https://api.github.com/users/aposipa/followers')
    .then(response => {
      console.log('this is the response', response.data)
      this.setState({
        users: response.data
      });
    })
    .catch(error => console.log(error))
    axios.get('https://api.github.com/users/aposipa')
    .then(response => {
      console.log('this is the response for my own profile', response.data)
      this.setState({
        myself: response.data
      });
    })
    .catch(error => console.log(error))
  }
  

  render() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Card style={myCardStyle}>
          <CardBody>
            <CardTitle>{this.state.myself.name}</CardTitle> 
            <CardImg style={imgStyle} src={this.state.myself.avatar_url} alt={this.state.myself.name}/>
          </CardBody>
        </Card>
      {this.state.users.map(follower => (
        <div key={follower.id}className="followers">
        <Card style={cardStyle}>
          <CardBody>
            <CardTitle>{follower.login}</CardTitle> 
            <CardImg style={imgStyle} src={follower.avatar_url} alt={follower.name}/>
          </CardBody>
        </Card>
        </div>
      ))}
      
    </div>
  );
  }
}

export default App;
