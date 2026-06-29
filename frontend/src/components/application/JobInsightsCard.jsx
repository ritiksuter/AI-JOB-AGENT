import Card from "../common/Card";

const JobInsightsCard = ({ insights }) => {
  if (!insights) return null;

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        📊 AI Job Insights
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-5">
          <p className="text-sm text-gray-500">
            Job Difficulty
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {insights.difficulty || "N/A"}
          </h3>
        </div>

        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-sm text-gray-500">
            Estimated ATS Score
          </p>

          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            {insights.estimatedATS}%
          </h3>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-green-50 p-5">
        <h3 className="mb-2 text-lg font-semibold">
          🤖 AI Recommendation
        </h3>

        <p className="leading-7 text-gray-700">
          {insights.recommendation ||
            "No recommendation available."}
        </p>
      </div>
    </Card>
  );
};

export default JobInsightsCard;