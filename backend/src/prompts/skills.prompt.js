export const buildSkillsAnalysisPrompt = ({
  jobDescription,
}) => `
You are an expert ATS (Applicant Tracking System), Senior Technical Recruiter and Software Engineering Interviewer.

A candidate's resume PDF has been attached.

Analyze the resume against the following job description.

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
INSTRUCTIONS
========================

Return ONLY valid JSON.

Do NOT include markdown.

Do NOT include explanation.

Do NOT include comments.

Use the following JSON schema exactly.

{
  "skillsAnalysis": {
    "overallScore": 0,
    "matchedSkills": [],
    "missingSkills": [],
    "suggestions": []
  },

  "resumeSuggestions": {
    "strengths": [],
    "improvements": [],
    "missingKeywords": []
  },

  "interviewPreparation": {
    "technicalQuestions": [],
    "behavioralQuestions": [],
    "hrQuestions": []
  },

  "jobInsights": {
    "difficulty": "",
    "estimatedATS": 0,
    "recommendation": ""
  }
}

========================
RULES
========================

1. overallScore must be between 0 and 100.

2. estimatedATS must be between 0 and 100.

3. matchedSkills must only contain skills present in both the resume and job description.

4. missingSkills must contain skills required in the job but missing from the resume.

5. suggestions must provide actionable improvements for this specific application.

6. strengths should highlight the strongest parts of the resume.

7. improvements should describe what should be improved.

8. missingKeywords should contain ATS keywords missing from the resume.

9. Generate exactly:

- 5 technical interview questions
- 5 behavioral interview questions
- 5 HR interview questions

Questions should be specific to the job description.

10. difficulty must be one of:

"Easy"
"Medium"
"Hard"

11. recommendation should be a concise hiring assessment (2–3 sentences) explaining whether the candidate is a strong fit and why.

Return ONLY valid JSON.
`;