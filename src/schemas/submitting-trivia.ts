import { z } from "zod";

import { questionSchema } from "~/schemas/question-schema";

export const answeredTriviaSchema = z.object({
  questions: z.array(questionSchema),
});
export type TAnsweredTrivia = z.infer<typeof answeredTriviaSchema>;
