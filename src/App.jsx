import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

function generateRandomId() {
  let text = "";
  let possible = "01234567";
  for (let i = 0; i <= 7; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return parseInt(text);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "BOB234627663"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "ANO999227621"
        },
        {
          username: "Posh",
          content: "How's everyone doing?",
          id: "ANO999227614"
        }        
      ]
    }
  }

  addNewMessage = newMessageInput => {  
    const oldMessages = this.state.messages;
    const newMessageObject = {
      username : this.state.currentUser.name,
      content : newMessageInput,
      id : generateRandomId()
    };
    const newMessages = [...oldMessages, newMessageObject];
    this.setState({ messages: newMessages });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
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


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar currentUser= {this.state.currentUser} addNewMessage={this.addNewMessage} />
      </div>    
    );
  }
}
export default App;
