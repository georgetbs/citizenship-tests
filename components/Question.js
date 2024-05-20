import { useTranslation } from 'next-i18next';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function Question({ question, questionIndex, totalQuestions, selectedAnswer, onAnswer, showHint, setShowHint, mode }) {
  const { t } = useTranslation('common');

  if (!question) return null;

  return (
    <div>
      <h2 className="text-xl mb-4">{`${t('question')} ${questionIndex + 1}/${totalQuestions}`}</h2>
      <p className="mb-4">{question.question}</p>
      <div className="mb-4">
        {question.options.map((option, index) => (
          <label key={index} className="mb-2 flex items-center">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswer(question.id, option)}
              className="mr-2"
            />
            {option}
            {selectedAnswer && mode === 'study' && (
              <>
                {option === question.answer && selectedAnswer === option && (
                  <FaCheck className="ml-2 text-green-500" />
                )}
                {option !== question.answer && selectedAnswer === option && (
                  <FaTimes className="ml-2 text-red-500" />
                )}
              </>
            )}
          </label>
        ))}
      </div>
      {mode === 'study' && (
        <div className="mb-4">
          <button onClick={() => setShowHint(!showHint)} className="p-2 border border-primary">
            {t('show_hint')}
          </button>
          {showHint && <p>{question.hint}</p>}
        </div>
      )}
    </div>
  );
}
