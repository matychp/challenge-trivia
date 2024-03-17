import { z } from "zod";

export const answerSchema = z.string().optional();
export type TAnswer = z.infer<typeof answerSchema>;
