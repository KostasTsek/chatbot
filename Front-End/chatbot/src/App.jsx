import sendIcon from './assets/arrow_upward.svg'
import botAvatar from './assets/bot.png'
import './App.css'
import { useState, useRef, useEffect } from 'react';

function MessageBox({ sender, text }) {
  const isUser = sender === 'user';

  return(
    <div className={`message-wrapper ${isUser ? "user" : "bot"}`}>
      <div className={`messageBox ${isUser ? "user" : "bot"}`}>
        {!isUser && (
          <div className='bot-Avatar'>
            <img src={botAvatar} alt='bot' width='30vw' height='30vh'/>
          </div>
        )}
        <div className={`content ${isUser ? "user" : "bot"}`}>{text}</div>
      </div>
    </div>
    );
}

function InputBox({inputText, setInputText, onSend}) {

  return(
    <div className='chat-input-container'>
      <input className='chat-input' type='text' placeholder='Type anything.' value={inputText} onChange={(e) => setInputText(e.target.value)}/>
      <button className="send-button"><img className='send_icon' src={sendIcon} alt='send' width='20vw' height='20vh' onClick={onSend}/></button>
    </div>
  );
}

function App() {
  const [messages, setMessages]= useState([]);
  const [inputText, setInputText] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(true);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    /* Checking if input is empty and if it is the user's turn to send a message. */
    if(canSendMessage && inputText.trim() !== ""){
      setMessages(prevMessages => [...prevMessages, { sender: "user", text: inputText }])
      setInputText("");
      setCanSendMessage(false);

      /* Making request to the server. */
      const response = await fetch("http://localhost:5000/chat", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input: inputText })
      });

      /* Getting response and updating Messages. */
      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { sender: "bot", text: data.reply }]);
      setCanSendMessage(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <header className='header-container'><h1>Chatbot</h1><hr/></header>
      <div className='message-container'>
        {messages.map((msg, i) => (
          <MessageBox key={i} sender={msg.sender} text={msg.text}/>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <InputBox inputText={inputText} setInputText={setInputText} onSend={sendMessage}/>
    </>
  );
}

export default App
