import Button from "./Button";

const EmptyState = ({
  title = "Nothing here yet",
  description = "There's no data available at the moment.",
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-gray-300
        bg-white
        px-6
        py-12
        text-center
        ${className}
      `}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <span className="text-3xl">📂</span>
      </div>

      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>

      {actionText && onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;