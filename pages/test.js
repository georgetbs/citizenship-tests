import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
  const [showHint, setShowHint] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [pass, setPass] = useState(null);
  const [timer, setTimer] = useState(0);
  const [numQuestions, setNumQuestions] = useState(200);
  const [questionSet, setQuestionSet] = useState('first');
  const [useNumQuestions, setUseNumQuestions] = useState(true);

  const handleStart = () => {
    if (selectedCategories.length === 0) {
      alert(t('please_select_category'));
      return;
    }

    let allQuestions = [];
    selectedCategories.forEach((category) => {
      const data = categoryData[category] || [];
      if (mode === 'study') {
        if (useNumQuestions) {
          allQuestions = [...allQuestions, ...shuffleArray(data).slice(0, numQuestions)];
        } else {
          switch (questionSet) {
            case 'first':
              allQuestions = [...allQuestions, ...data.slice(0, 50)];
              break;
            case 'second':
              allQuestions = [...allQuestions, ...data.slice(50, 100)];
              break;
            case 'third':
              allQuestions = [...allQuestions, ...data.slice(100, 150)];
              break;
            case 'fourth':
              allQuestions = [...allQuestions, ...data.slice(150, 200)];
              break;
            default:
              allQuestions = [...allQuestions, ...data];
              break;
          }
        }
      } else {
        allQuestions = [...allQuestions, ...data];
      }
    });

    if (mode === 'exam') {
      setQuestions(shuffleArray(allQuestions).slice(0, 10));
      setTimer(20 * 60); // 20 минут
    } else {
      setQuestions(allQuestions);
    }

    // Добавим к URL параметр questions для индикации начатого теста
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, questions: true },
    });
  };

  useEffect(() => {
    if (mode === 'exam' && timer > 0) {
      const timerId = setInterval(() => setTimer(timer - 1), 1000);
      if (timer === 1) handleFinish();
      return () => clearInterval(timerId);
    }
  }, [timer, mode]);

  const handleAnswer = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
    setShowHint(false); // Скрыть подсказку при переходе к следующему вопросу
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setShowHint(false); // Скрыть подсказку при возврате к предыдущему вопросу
  };

  const handleFinish = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert(t('please_answer_all_questions'));
      return;
    }

    if (confirm(t('finish') + '?')) {
      let correct = 0;
      let incorrect = 0;

      questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.answer) {
          correct++;
        } else {
          incorrect++;
        }
      });

      setCorrectCount(correct);
      setIncorrectCount(incorrect);

      if (mode === 'exam') {
        const passPercentage = (correct / questions.length) * 100;
        setPass(passPercentage >= 70);
      }

      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setSelectedCategories([]);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowHint(false);
    setShowResults(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setPass(null);
    setTimer(0);

    // Удалим параметр questions из URL
    router.replace({
      pathname: router.pathname,
      query: { mode: router.query.mode },
    });
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
                  onChange={(e) =>
                    setSelectedCategories(
                      e.target.checked
                        ? [...selectedCategories, e.target.value]
                        : selectedCategories.filter((cat) => cat !== e.target.value)
                    )
                  }
                />{' '}
                {t('language_test')}
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="history"
                  onChange={(e) =>
                    setSelectedCategories(
                      e.target.checked
                        ? [...selectedCategories, e.target.value]
                        : selectedCategories.filter((cat) => cat !== e.target.value)
                    )
                  }
                />{' '}
                {t('history_test')}
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  value="law"
                  onChange={(e) =>
                    setSelectedCategories(
                      e.target.checked
                        ? [...selectedCategories, e.target.value]
                        : selectedCategories.filter((cat) => cat !== e.target.value)
                    )
                  }
                />{' '}
                {t('law_test')}
              </label>
            </div>
            {mode === 'study' && (
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="questionMode"
                      value="number"
                      checked={useNumQuestions}
                      onChange={() => setUseNumQuestions(true)}
                      className="mr-2"
                    />
                    {t('select_number_of_questions')}
                  </label>
                </div>
                <input
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                  className="block w-full p-2 border border-primary mb-4"
                  disabled={!useNumQuestions}
                />
                <div className="flex items-center mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="questionMode"
                      value="set"
                      checked={!useNumQuestions}
                      onChange={() => setUseNumQuestions(false)}
                      className="mr-2"
                    />
                    {t('select_question_set')}
                  </label>
                </div>
                <select
                  value={questionSet}
                  onChange={(e) => setQuestionSet(e.target.value)}
                  className="block w-full p-2 border border-primary"
                  disabled={useNumQuestions}
                >
                  <option value="first">{t('first_50')}</option>
                  <option value="second">{t('second_50')}</option>
                  <option value="third">{t('third_50')}</option>
                  <option value="fourth">{t('fourth_50')}</option>
                  <option value="all">{t('all_200')}</option>
                </select>
              </div>
            )}
            <button onClick={handleStart} className="p-2 border border-primary">
              {mode === 'exam' ? t('start_exam') : t('start_study')}
            </button>
          </div>
        ) : showResults ? (
          <div>
            <h1 className="text-3xl mb-8">{t('results')}</h1>
            <ul>
              {questions.map((question, index) => (
                <li key={question.id} className="mb-4">
                  <p>
                    {index + 1}. {question.question}
                  </p>
                  <p>
                    {t('your_answer')}: {selectedAnswers[question.id]}
                  </p>
                  <p>
                    {t('correct_answer')}: {question.answer}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p>
                {t('correct_count')}: {correctCount}
              </p>
              <p>
                {t('incorrect_count')}: {incorrectCount}
              </p>
              {mode === 'exam' && (
                <p>
                  {t('verdict')}: {pass ? t('pass') : t('fail')}
                </p>
              )}
            </div>
            <button onClick={handleRestart} className="p-2 border border-primary mt-4">
              {t('restart')}
            </button>
          </div>
        ) : (
          <>
            {mode === 'exam' && (
              <div className="text-right mb-4">
                <span>
                  {t('time_left')}: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
                </span>
              </div>
            )}
            {questions.length > 0 && (
              <Question
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswers[questions[currentQuestionIndex]?.id]}
                onAnswer={handleAnswer}
                showHint={showHint}
                setShowHint={setShowHint}
                mode={mode}
              />
            )}
            <div className="flex justify-between mt-4">
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="p-2 border">
                {t('previous')}
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNext} className="p-2 border">
                  {t('next')}
                </button>
              ) : (
                <button onClick={handleFinish} className="p-2">
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
