import sendIcon from './assets/arrow_upward.svg'
import botAvatar from './assets/bot.png'
import './App.css'

function MessageBox({ sender, text }) {
  const isUser = sender === 'user';

  return(
    <div className='messageBox'>
      {!isUser && (
        <img src={botAvatar} alt='bot' className='bot-Avatar'/>
      )}
      <div className='content'>{text}</div>
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
        <MessageBox sender='user' text='Question'/>
        <MessageBox sender='bot' text='Answer'/>
      </div>
      <InputBox/>
    </div>
  );
}

export default App
