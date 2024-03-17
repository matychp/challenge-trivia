import { z } from "zod";

import { questionSchema } from "~/schemas/question-schema";

export const triviaSchema = z.object({
  questions: z.array(questionSchema),
});
export type TTrivia = z.infer<typeof triviaSchema>;
