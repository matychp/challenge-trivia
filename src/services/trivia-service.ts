import { type TAnsweredTrivia } from "~/schemas/submitting-trivia";
import { type TTrivia } from "~/schemas/trivia-schema";

export const getDailyTrivia: () => Promise<TTrivia> = async () => {
  const numberOfQuestions = Math.floor(Math.random() * 10) + 1;

  return {
    questions: Array.from({ length: numberOfQuestions }, (_, index) => {
      const numberOfPossibleAnswers = Math.floor(Math.random() * 3) + 2; // Min 2, max 4
      const posibleAnswers = Array.from(
        { length: numberOfPossibleAnswers },
        (_, index) => ({
          value: `Answer ${index}`,
        }),
      );

      return {
        id: index,
        value: `What is the answer to question ${index}?`,
        timeout: Math.floor(Math.random() * 15) + 1,
        posibleAnswers,
        answer: undefined,
      };
    }),
  };
};

export const submitTrivia: (trivia: TAnsweredTrivia) => Promise<void> = async (
  trivia,
) => {
  console.debug("Submitting trivia", trivia);
};
