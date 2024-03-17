"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Question } from "~/components/question";
import { ReviewTrivia } from "~/components/review-trivia";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { questionSchema, type TQuestion } from "~/schemas/question-schema";
import { submitTrivia } from "~/services/trivia-service";

const formSchema = z.object({
  questions: z.array(questionSchema),
});
type FormValues = z.infer<typeof formSchema>;

interface TriviaProps {
  trivia: {
    questions: TQuestion[];
  };
}

export function Trivia({ trivia: { questions = [] } }: TriviaProps) {
  const [currentQuestionPosition, setCurrentQuestionPosition] =
    useState<number>(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions,
    },
  });

  const currentQuestion = useMemo(
    () => questions[currentQuestionPosition],
    [currentQuestionPosition, questions],
  );
  const currentAnswer = form.watch(
    `questions.${currentQuestionPosition}.answer`,
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await submitTrivia(values);
  }

  function moveToNextQuestion() {
    setCurrentQuestionPosition((prev) => prev + 1);
  }

  return (
    <Form {...form}>
      <form
        id="trivia-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex grow flex-col"
      >
        {questions.length !== currentQuestionPosition ? (
          <div className="flex w-full grow flex-col items-center justify-center space-y-8 p-8">
            <Question
              key={currentQuestion!.id}
              timeout={currentQuestion!.timeout}
              question={currentQuestion!}
              onTimeoutEnd={() => moveToNextQuestion()}
            >
              <FormField
                control={form.control}
                name={`questions.${currentQuestionPosition}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {currentQuestion!.posibleAnswers.map(
                          (answer, answerIndex) => (
                            <div
                              key={answerIndex}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={answer.value}
                                id={answer.value}
                              />
                              <Label htmlFor={answer.value}>
                                {answer.value}
                              </Label>
                            </div>
                          ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Question>
            <div className="flex w-full justify-end">
              <Button
                onClick={() => moveToNextQuestion()}
                disabled={currentAnswer === undefined}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <ReviewTrivia questions={form.getValues().questions} />
        )}
      </form>
    </Form>
  );
}
