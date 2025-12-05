export default function LeftSideSection({ shuffledKanji, remainKanji, correctAnswer }) {
  return (
    <div className="left-side-section">
      <div className="correct-answers">
        <h4>Your Correct Answers</h4>
        <div className="submitted-kanji-container">
          {correctAnswer && correctAnswer.length > 0 ? (
            correctAnswer.map((kanji, index) => (
              <div className="submitted-kanji" key={index}>
                {kanji.kanji}
              </div>
            ))
          ) : (
            <div className="empty-answers-state">
              <i className="fas fa-clipboard-list empty-answers-icon"></i>
              <p className="empty-answers-text">No answers yet</p>
            </div>
          )}
        </div>
      </div>
      <div className="stats-container">
        <p className="stat-count">Kanji Count: {shuffledKanji.length}</p>
        <p className="stat-remaining">Kanji Remain: {remainKanji.length}</p>
      </div>
    </div>
  );
}