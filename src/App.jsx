import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const ws = new WebSocket("ws://localhost:3001");
const uuid = require('uuid/v4');

// function generateRandomId() {
//   let text = "";
//   let possible = "01234567";
//   for (let i = 0; i <= 7; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//   return parseInt(text);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      id : uuid(),
      messages: []  // messages coming from the server will be stored here as they arrive
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    console.log("Connected to server");

    ws.onmessage = (event) => {
      console.log(event.data);
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addNewMessage = (newMessageInput) => {  
    const oldMessages = this.state.messages;
    const newMessageObject = {
      username : this.state.currentUser.name,
      content : newMessageInput,
      id : uuid()
    };
    const newMessages = [...oldMessages, newMessageObject];
    this.setState({ messages: newMessages });

    const msg = JSON.stringify(newMessages);
    ws.send(msg);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">CHATTY</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser= {this.state.currentUser} addNewMessage={this.addNewMessage} />
      </div>    
    );
  }
}
export default App;