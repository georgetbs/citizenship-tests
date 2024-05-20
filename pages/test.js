import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Question from '../components/Question';

import languageData from '../data/language.json';
import historyData from '../data/history.json';
import lawData from '../data/law.json';

const categoryData = {
  language: languageData,
  history: historyData,
  law: lawData,
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export default function Test() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { mode } = router.query;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(0);

  const handleStart = () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    let allQuestions = [];
    selectedCategories.forEach(category => {
      const data = categoryData[category] || [];
      allQuestions = [...allQuestions, ...data];
    });

    if (mode === 'exam') {
      setQuestions(shuffleArray(allQuestions).slice(0, 10));
      setTimer(20 * 60); // 20 минут
    } else {
      setQuestions(allQuestions);
    }
  };

  useEffect(() => {
    if (mode === 'exam' && timer > 0) {
      const timerId = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timer, mode]);

  const handleAnswer = (questionIndex, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questions[questionIndex].id]: answer });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSubmit = () => {
    // Обработка результатов теста
    console.log('Results:', selectedAnswers);
    alert('Test submitted!');
  };

  return (
    <div className="container mx-auto">
      <Header />
      <main className="p-10">
        {!questions.length ? (
          <div>
            <h1 className="text-3xl mb-8">{t('choose_categories')}</h1>
            <div className="mb-4">
              <label className="block">
                <input
                  type="checkbox"
                  value="language"
                  onChange={(e) => setSelectedCategories(
                    e.target.checked
                      ? [...selectedCategories, e.target.value]
                      : selectedCategories.filter(cat => cat !== e.target.value)
                  )}
                /> {t('language_test')}
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="history"
                  onChange={(e) => setSelectedCategories(
                    e.target.checked
                      ? [...selectedCategories, e.target.value]
                      : selectedCategories.filter(cat => cat !== e.target.value)
                  )}
                /> {t('history_test')}
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="law"
                  onChange={(e) => setSelectedCategories(
                    e.target.checked
                      ? [...selectedCategories, e.target.value]
                      : selectedCategories.filter(cat => cat !== e.target.value)
                  )}
                /> {t('law_test')}
              </label>
            </div>
            <button onClick={handleStart} className="p-2 border-2 border-primary">
              {t('start_study')}
            </button>
          </div>
        ) : (
          <>
            {mode === 'exam' && (
              <div className="text-right mb-4">
                <span>{t('time_left')}: {Math.floor(timer / 60)}:{('0' + timer % 60).slice(-2)}</span>
              </div>
            )}
            {questions.length > 0 && (
              <Question
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswers[questions[currentQuestionIndex].id]}
                onAnswer={handleAnswer}
              />
            )}
            <div className="flex justify-between mt-4">
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="p-2">
                {t('previous')}
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNext} className="p-2">
                  {t('next')}
                </button>
              ) : (
                <button onClick={handleSubmit} className="p-2">
                  {t('submit')}
                </button>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
