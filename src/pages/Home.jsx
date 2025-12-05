import { useState, useEffect, useRef } from "react";
import MainLayout from '../layouts/MainLayout';
import LeftSideSection from '../components/common/LeftSideSection'
import MiddleSideSection from '../components/common/MiddleSideSection'
import RightSideSection from '../components/common/RightSideSection'
import { kanjiData } from '../components/data/kanjiList';
import '../styles/Home.css';


export default function Home() {
  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    return shuffled
  }
  const [shuffledKanji, setShuffledKanji] = useState(() => shuffleArray(kanjiData)); // ← Added setShuffledKanji to make it updatable
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [remainKanji, setRemainKanji] = useState(shuffledKanji)
  const [currentKanji, setCurrentKanji] = useState(shuffledKanji[0])
  const [correctAnswer, setCorrectAnswer] = useState([])
  const hasInitialized = useRef(false); // ← Track if initial message was sent to prevent cascading renders
  
  useEffect(() => {
    if (isRunning && !hasInitialized.current && currentKanji) { // ← Check hasInitialized instead of messages.length to prevent re-triggering
      setMessages([{
        sender: 'system',
        text: 'What is this kanji?',
        meaning: currentKanji.meaning
      }])
      hasInitialized.current = true; // ← Mark as initialized
    }
    
    if (!isRunning) { // ← Reset flag when stopped so it can initialize again on next start
      hasInitialized.current = false;
    }
  }, [isRunning, currentKanji]) // ← Added currentKanji to dependencies to fix React warning
  
  // ✓ Fixed: Compare with kanji character
  const checkAnswear = (userAnswear) => {
    const cleanAnswer = userAnswear.trim();
    const correctAnswer = currentKanji.kanji;
    return cleanAnswer === correctAnswer;
  }
  
  const handleSubmit = (userAnswear) => {
    // ✓ Fixed: userAnswear not {userAnswear}
    setMessages(prev => [
      ...prev, {
        sender: 'user',
        text: userAnswear,
      }
    ])
    
    const isCorrect = checkAnswear(userAnswear)
    
    if (isCorrect) {
      setCorrectAnswer(prev => [...prev, currentKanji])
      setMessages(prev => [
        ...prev, {
          sender: 'system',
          text: '✓ Correct! To the next one!'
        }
      ]);
      
      const newRemaining = remainKanji.filter(k => k !== currentKanji)
      setRemainKanji(newRemaining);
      
      if (newRemaining.length > 0) {
        const nextKanji = newRemaining[0]
        setCurrentKanji(nextKanji);
        
        // ✓ Fixed: Use nextKanji.meaning
        setMessages(prev => [
          ...prev, {
            sender: 'system',
            text: 'What is this kanji?',
            meaning: nextKanji.meaning,
          }
        ])
      } else {
        // ✓ Fixed: String() before padStart
        setMessages(prev => [
          ...prev, {
            sender: 'system',
            text: `🎉 Perfect! You completed all ${shuffledKanji.length} kanji in ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}!`
          }
        ])
        
        // ← Auto-reset after completion: re-shuffle and reset all states
        setTimeout(() => {
          const newShuffled = shuffleArray(kanjiData);
          setShuffledKanji(newShuffled);
          setRemainKanji(newShuffled);
          setCurrentKanji(newShuffled[0]);
          setIsRunning(false);
          setCorrectAnswer([]);
          setMessages([]);
          setSeconds(0);
        }, 3000); // ← Wait 3 seconds so user can see completion message
      }
    } else {
      setMessages(prev => [
        ...prev, {
          sender: 'system',
          text: '✗ Not quite. Try again!'
        }
      ])
    }
  }
  
  const handleReset = () => { // ← New reset function that re-shuffles kanji
    const newShuffled = shuffleArray(kanjiData);
    setShuffledKanji(newShuffled);
    setRemainKanji(newShuffled);
    setCurrentKanji(newShuffled[0]);
    setCorrectAnswer([]);
    setMessages([]);
    setSeconds(0);
    setIsRunning(false);
  };
  
  return (
    <MainLayout>
      <main className="content">
        <LeftSideSection 
          isRunning={isRunning} 
          shuffledKanji={shuffledKanji}
          remainKanji={remainKanji}
          correctAnswer={correctAnswer}
        />
        <MiddleSideSection 
          isRunning={isRunning}
          handleSubmit={handleSubmit}
          messages={messages}
        />
        <RightSideSection 
          isRunning={isRunning} 
          setIsRunning={setIsRunning}
          seconds={seconds}
          setSeconds={setSeconds}
          handleReset={handleReset}
        />
      </main>
    </MainLayout>
  );
}