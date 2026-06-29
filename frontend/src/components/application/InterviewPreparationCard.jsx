import Card from "../common/Card";

const QuestionSection = ({
  title,
  icon,
  questions,
}) => (
  <div>
    <h3 className="mb-4 text-lg font-semibold">
      {icon} {title}
    </h3>

    {questions?.length ? (
      <ol className="list-decimal space-y-3 pl-5 text-gray-700">
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ol>
    ) : (
      <p className="text-gray-500">
        No questions available.
      </p>
    )}
  </div>
);

const InterviewPreparationCard = ({
  interview,
}) => {
  if (!interview) return null;

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        🎤 AI Interview Preparation
      </h2>

      <div className="space-y-8">
        <QuestionSection
          title="Technical Questions"
          icon="💻"
          questions={
            interview.technicalQuestions
          }
        />

        <QuestionSection
          title="Behavioral Questions"
          icon="🤝"
          questions={
            interview.behavioralQuestions
          }
        />

        <QuestionSection
          title="HR Questions"
          icon="👤"
          questions={interview.hrQuestions}
        />
      </div>
    </Card>
  );
};

export default InterviewPreparationCard;