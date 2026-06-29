import Card from "../common/Card";

const ResumeSuggestionsCard = ({ suggestions }) => {
  if (!suggestions) return null;

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        📄 Resume Improvement Suggestions
      </h2>

      <div className="space-y-6">
        {/* Strengths */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-green-600">
            ✅ Strengths
          </h3>

          {suggestions.strengths?.length ? (
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {suggestions.strengths.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          ) : (
            <p className="text-gray-500">
              No strengths available.
            </p>
          )}
        </div>

        {/* Improvements */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-orange-600">
            🚀 Improvements
          </h3>

          {suggestions.improvements?.length ? (
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {suggestions.improvements.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          ) : (
            <p className="text-gray-500">
              No improvements available.
            </p>
          )}
        </div>

        {/* Missing Keywords */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-red-600">
            🔑 Missing ATS Keywords
          </h3>

          <div className="flex flex-wrap gap-2">
            {suggestions.missingKeywords?.length ? (
              suggestions.missingKeywords.map(
                (keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                  >
                    {keyword}
                  </span>
                ),
              )
            ) : (
              <p className="text-gray-500">
                No missing keywords.
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumeSuggestionsCard;