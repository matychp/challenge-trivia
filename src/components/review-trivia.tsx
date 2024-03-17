import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type TQuestion } from "~/schemas/question-schema";

interface ReviewTriviaProps {
  questions: TQuestion[];
}

export function ReviewTrivia({ questions }: ReviewTriviaProps) {
  return (
    <div className="flex h-dvh flex-col gap-4 p-8">
      <Label>Review</Label>
      <ScrollArea className="grow">
        <div className="flex flex-col gap-4">
          {questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle>{`${index}. ${question.value}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue={question.answer}>
                  {question.posibleAnswers.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        disabled
                        value={answer.value}
                        id={answer.value}
                      />
                      <Label htmlFor={answer.value} className="opacity-50">
                        {answer.value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <Button type="submit" form="trivia-form">
        Submit
      </Button>
    </div>
  );
}
