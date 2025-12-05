import { useRef, useEffect } from 'react'

export default function Question({ messages }) {

    const chatMessagesRef = useRef(null)

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
        }
    })

  return (
    <div className='chat-container' ref={chatMessagesRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.meaning && <span className="meaning-large">{msg.meaning}</span>}
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
}