const Loader = ({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`
          ${sizes[size]}
          animate-spin
          rounded-full
          border-blue-600
          border-t-transparent
        `}
      />

      {text && (
        <p className="text-sm font-medium text-gray-600">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        {loader}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      {loader}
    </div>
  );
};

export default Loader;