import { useState } from 'react'
import Question from './QuestionsHandler'

export default function MiddleSideSection({ isRunning, handleSubmit, messages }) {

  const [inputText, setInputText] = useState('')
  

  function saveInputText(event) {
    setInputText(event.target.value)
  }

  function onsubmit() {
    if (inputText.trim()) {
      handleSubmit(inputText);
      setInputText('')
    }
  }

  function resetChat() {
    setInputText('')
  }

  function handleKayPres(event) {
    if (event.key === 'Enter') {
      onsubmit();
    }
  }

  return (
    <div className="middle-side-section">
      <div className="question-display">
        {/* Empty state message - shows when timer hasn't started */}
        {!isRunning ? (
          <div className="empty-state">
            <i className="fas fa-hourglass-start empty-state-icon"></i>
            <p className="empty-state-message">
              Press Start to begin your session
            </p>
          </div>
        ): 
          (
            <div className="question">
              <Question 
                messages={messages}
              />
            </div>
          )}
      </div>
      <div className="input-container">
        <input type="text" className="text-field" placeholder="Start Typing" onChange={saveInputText} value={inputText} disabled={!isRunning} onKeyPress={handleKayPres}/>
        <button className="send-button" onClick={onsubmit} disabled={!isRunning || !inputText.trim()}> Send </button>
        <button className="reset-button" onClick={resetChat}> clear </button>
      </div>
    </div>
  );
}