const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
  interviewType,       // e.g., "Technical", "Behavioral", "Mixed (Technical + Behavioral)", "System Design (Senior level)", etc.
  domain,              // e.g. "Software Development", "Marketing"
  jobDescription = "", // Optional
  includeBehavioral = false
) => `
You are an AI trained to generate interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Domain: ${domain}
- Interview Type: ${interviewType}
- Focus Topics: ${topicsToFocus}
- Number of Questions: ${numberOfQuestions}

Guidelines:
- If interview type is "Technical", focus purely on technical questions.
- If "Behavioral", focus on real-world scenarios using STAR method.
- If "Mixed (Technical + Behavioral)", include a balanced mix of both.
- If "System Design (Senior level)", focus on architecture, scalability, and high-level decision-making.
- If "Phone Screen", generate general-level questions to test baseline competence.
- If "Final Round", include deeper problem-solving and culture-fit questions.

${includeBehavioral ? "- Make sure at least one behavioral question follows the STAR format." : ""}
${jobDescription ? `- Consider the following Job Description when generating questions: ${jobDescription}` : ""}

Formatting:
- If the answer needs a code example, add a small code block inside.
- Keep the formatting very clean and clear.

- Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  },
  ...
]

Important: Do NOT add any extra text. Only return valid JSON.
`;


const conceptExplainPrompt = (question) => `
You are an AI trained to generate explanations for a given interview question.

Task:

- Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
- Question: "${question}"
- After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
- If the explanation includes a code example, provide a small code block.
- Keep the formatting very clean and clear.
- Return the result as a valid JSON object in the following format:

{
    "title": "Short title here?",
    "explanation": "Explanation here."
}

Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
