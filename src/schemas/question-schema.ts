import { z } from "zod";
import { answerSchema } from "./answer-schema";

export const questionSchema = z.object({
  id: z.number(),
  value: z.string(),
  timeout: z.number(),
  posibleAnswers: z.array(
    z.object({
      value: z.string(),
    }),
  ),
  answer: answerSchema,
});
export type TQuestion = z.infer<typeof questionSchema>;
