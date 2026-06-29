import { generateJSONFromResume } from "./ai/gemini.service.js";
import { buildSkillsAnalysisPrompt } from "../prompts/skills.prompt.js";

export const analyzeApplication = async ({
  resumeUrl,
  jobDescription,
}) => {
  try {
    const prompt = buildSkillsAnalysisPrompt({
      jobDescription,
    });

    const analysis = await generateJSONFromResume({
      resumeUrl,
      prompt,
    });

    return {
      skillsAnalysis: {
        overallScore:
          analysis.skillsAnalysis?.overallScore ?? 0,

        matchedSkills:
          analysis.skillsAnalysis?.matchedSkills ?? [],

        missingSkills:
          analysis.skillsAnalysis?.missingSkills ?? [],

        suggestions:
          analysis.skillsAnalysis?.suggestions ?? [],
      },

      resumeSuggestions: {
        strengths:
          analysis.resumeSuggestions?.strengths ?? [],

        improvements:
          analysis.resumeSuggestions?.improvements ?? [],

        missingKeywords:
          analysis.resumeSuggestions?.missingKeywords ?? [],
      },

      interviewPreparation: {
        technicalQuestions:
          analysis.interviewPreparation
            ?.technicalQuestions ?? [],

        behavioralQuestions:
          analysis.interviewPreparation
            ?.behavioralQuestions ?? [],

        hrQuestions:
          analysis.interviewPreparation
            ?.hrQuestions ?? [],
      },

      jobInsights: {
        difficulty:
          analysis.jobInsights?.difficulty ?? "",

        estimatedATS:
          analysis.jobInsights?.estimatedATS ?? 0,

        recommendation:
          analysis.jobInsights?.recommendation ?? "",
      },
    };
  } catch (error) {
    console.error(
      "AI Analysis Error:",
      error,
    );

    return {
      skillsAnalysis: {
        overallScore: 0,
        matchedSkills: [],
        missingSkills: [],
        suggestions: [],
      },

      resumeSuggestions: {
        strengths: [],
        improvements: [],
        missingKeywords: [],
      },

      interviewPreparation: {
        technicalQuestions: [],
        behavioralQuestions: [],
        hrQuestions: [],
      },

      jobInsights: {
        difficulty: "",
        estimatedATS: 0,
        recommendation: "",
      },
    };
  }
};