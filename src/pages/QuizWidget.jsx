import React, { useState, useEffect } from 'react';
import { Target, Loader2 } from 'lucide-react';
import './QuizWidget.css';

const QuizWidget = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchQuiz = async () => {
      setIsLoading(true);
      setErrorMsg("");
      try {
          const res = await fetch('/api/study/quiz', { method: 'POST' });
          if(res.ok) {
              const data = await res.json();
              if(data.questions && data.questions.length > 0) {
                  setQuestions(data.questions);
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowResult(false);
              } else {
                  setErrorMsg("No quiz generation possible. Have you uploaded a document?");
              }
          } else {
              setErrorMsg("Server returned an error. Make sure your backend is running.");
          }
      } catch (e) {
          setErrorMsg("Could not connect to backend server.");
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
     fetchQuiz();
  }, []);

  const handleOptionSelect = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (isLoading) {
      return (
          <div className="quiz-container animate-fade-in" style={{alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
              <Loader2 className="spinner" size={48} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
              <p className="mt-4 text-muted">Generating your customized quiz...</p>
          </div>
      );
  }

  if (errorMsg || questions.length === 0) {
      return (
          <div className="quiz-container animate-fade-in">
             <div className="quiz-card glass-panel" style={{textAlign: 'center', padding: '60px'}}>
                  <Target size={64} style={{color: 'var(--text-muted)', marginBottom: '20px'}}/>
                  <h3>Quiz Engine Unavailable</h3>
                  <p className="text-muted" style={{marginTop: '12px'}}>{errorMsg || "Upload a document first to generate interactive context quizzes."}</p>
                  <button className="btn btn-primary" style={{marginTop: '24px'}} onClick={fetchQuiz}>Try Again</button>
             </div>
          </div>
      );
  }

  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-header">
        <h2>Study Quizzes</h2>
        <p className="text-muted">Test your knowledge intelligently.</p>
      </div>

      <div className="quiz-card glass-panel">
        {!showResult ? (
          <div className="quiz-content animate-fade-in">
            <div className="quiz-progress">
              Question {currentQuestion + 1} / {questions.length}
            </div>
            <h3 className="question-text">{questions[currentQuestion].question}</h3>
            
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, idx) => (
                <button 
                  key={idx} 
                  className="option-btn glass-card"
                  onClick={() => handleOptionSelect(idx)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-result animate-fade-in">
            <Target className="result-icon mx-auto" />
            <h2>Quiz Completed!</h2>
            <p className="text-muted">You scored {score} out of {questions.length}</p>
            <button className="btn btn-primary mx-auto" style={{marginTop: '24px'}} onClick={fetchQuiz}>
              Generate Next Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizWidget;
