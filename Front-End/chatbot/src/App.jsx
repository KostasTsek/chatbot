import sendIcon from './assets/arrow_upward.svg'
import './App.css'

function MessageBox() {
  return(
    <div className='messageBox'>
      <div className='content'></div>
    </div>
    );
}

function InputBox() {
  return(
    <div className='chat-input-container'>
      <input className='chat-input' type='text' placeholder='Type anything.'/>
      <button className="send-button"><img className='send_icon' src={sendIcon} alt='send'/></button>
    </div>
  );
}

function App() {
  return (
    <div>
      <header className='header-container'><h1>Chatbot</h1><hr/></header>
      <div className='message-container'>
        <MessageBox/>
      </div>
      <InputBox/>
    </div>
  );
}

export default App
