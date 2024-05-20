import { useTranslation } from 'next-i18next';

export default function Question({ question, questionIndex, totalQuestions, selectedAnswer, onAnswer }) {
  const { t } = useTranslation('common');

  if (!question) return null;

  return (
    <div>
      <h2 className="text-xl mb-4">{`${t('question')} ${questionIndex + 1}/${totalQuestions}`}</h2>
      <p className="mb-4">{question.question}</p>
      <div className="mb-4">
        {question.options.map((option, index) => (
          <label key={index} className="block mb-2">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswer(questionIndex, option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
      <p className="text-secondary">{question.hint}</p>
    </div>
  );
}
