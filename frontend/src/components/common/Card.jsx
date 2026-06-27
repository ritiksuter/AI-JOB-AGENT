const Card = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-xl font-bold text-gray-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-6 border-t border-gray-100 pt-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;