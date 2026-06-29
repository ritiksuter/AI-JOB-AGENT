import Card from "../common/Card";

const SkillsAnalysisCard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        🎯 Skills Match Analysis
      </h2>

      <div className="space-y-6">
        {/* Overall Score */}
        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-sm text-gray-500">
            Overall Match Score
          </p>

          <h3 className="mt-2 text-4xl font-bold text-blue-600">
            {analysis.overallScore}%
          </h3>
        </div>

        {/* Matched Skills */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-green-600">
            ✅ Matched Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {analysis.matchedSkills?.length ? (
              analysis.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">
                No matched skills found.
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-red-600">
            ❌ Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills?.length ? (
              analysis.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">
                No missing skills 🎉
              </p>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-blue-600">
            💡 AI Suggestions
          </h3>

          {analysis.suggestions?.length ? (
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {analysis.suggestions.map(
                (suggestion, index) => (
                  <li key={index}>
                    {suggestion}
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="text-gray-500">
              No suggestions available.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SkillsAnalysisCard;