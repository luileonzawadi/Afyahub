import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useQuiz, useSubmitQuiz } from '../../hooks/useQuery';
import Card from '../common/Card';
import Button from '../common/Button';
import './Quiz.css';

const Quiz = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { data: quiz } = useQuiz(moduleId);
  const submitQuiz = useSubmitQuiz();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleSubmit = async () => {
    try {
      const response = await submitQuiz.mutateAsync({
        quizId: quiz.id,
        answers
      });
      setResults(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Quiz submission failed:', error);
    }
  };

  if (submitted && results) {
    return (
      <div className="quiz-results">
        <div className="container">
          <Card>
            <div className="results-header">
              <h1>Quiz Results</h1>
              <div className="score-display">
                <span className="score">{results.score}%</span>
                <p>{results.passed ? 'Congratulations! You passed!' : 'Keep learning and try again'}</p>
              </div>
            </div>

            <div className="results-breakdown">
              {quiz.questions.map((question, idx) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="question-header">
                      <span className="question-number">Question {idx + 1}</span>
                      {isCorrect ? <FiCheckCircle /> : <FiXCircle />}
                    </div>
                    <p className="question-text">{question.text}</p>
                    <p className="explanation">{question.explanation}</p>
                  </div>
                );
              })}
            </div>

            <div className="results-actions">
              <Button onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}`)}>
                Back to Module
              </Button>
              {!results.passed && (
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Retake Quiz
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="container">
        <Card>
          <h1>{quiz?.title || 'Module Quiz'}</h1>
          <p className="quiz-description">Answer all questions to complete this module</p>

          <div className="questions">
            {quiz?.questions?.map((question, idx) => (
              <div key={question.id} className="question">
                <h3>Question {idx + 1}</h3>
                <p>{question.text}</p>
                <div className="answers">
                  {question.options.map(option => (
                    <label key={option.id} className="answer-option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswerSelect(question.id, option.id)}
                      />
                      <span>{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-actions">
            <Button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz?.questions?.length || submitQuiz.isPending}
            >
              {submitQuiz.isPending ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
