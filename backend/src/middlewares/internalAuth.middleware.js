export const verifyInternalApiKey = (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API Key is missing.",
      });
    }

    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid API Key.",
      });
    }

    next();
  } catch (error) {
    console.error("Internal Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};