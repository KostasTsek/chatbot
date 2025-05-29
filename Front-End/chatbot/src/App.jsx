import sendIcon from './assets/arrow_upward.svg'
import botAvatar from './assets/bot.png'
import './App.css'

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

function InputBox() {
  return(
    <div className='chat-input-container'>
      <input className='chat-input' type='text' placeholder='Type anything.'/>
      <button className="send-button"><img className='send_icon' src={sendIcon} alt='send' width='20vw' height='20vh'/></button>
    </div>
  );
}

function App() {
  return (
    <>
      <header className='header-container'><h1>Chatbot</h1><hr/></header>
      <div className='message-container'>
        <MessageBox sender='user' text='Question'/>
        <MessageBox sender='bot' text='aaaaaaaaaaaaaaaaaaaaaaaaaaaa woooord nicce words'/>
      </div>
      <InputBox/>
    </>
  );
}

export default App
