import { useEffect, useState, type ReactNode } from "react";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import type { TQuestion } from "~/schemas/question-schema";

interface QuestionProps {
  children: ReactNode;
  timeout: number;
  question: TQuestion;
  onTimeoutEnd: () => void;
}

export function Question({
  children,
  timeout,
  question,
  onTimeoutEnd,
}: QuestionProps) {
  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(timeout);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.debug("on timeout end");
      onTimeoutEnd();
    }, timeout * 1000);

    const intervalId = setInterval(
      () => {
        setProgress((prev) => {
          if (prev === 100) {
            return 0;
          }

          return prev + 1;
        });
      },
      (timeout * 1000) / 100,
    );

    const intervalOnSecondsId = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === 0) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      console.debug("clearing");
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      clearInterval(intervalOnSecondsId);
    };
  }, []);

  return (
    <Card className="flex w-full flex-col justify-center">
      <CardHeader>
        <CardTitle>{`${question.id}. ${question.value}`}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <Progress value={progress} />
        <Badge className="h-12 w-12 justify-center rounded-full text-center">
          {remainingSeconds}&quot;
        </Badge>
      </div>
    </Card>
  );
}
