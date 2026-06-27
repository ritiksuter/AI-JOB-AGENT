import Card from "../common/Card";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${colorClasses[color]}
          `}
        >
          {Icon && <Icon size={28} />}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;