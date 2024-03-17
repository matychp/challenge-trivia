import { Trivia } from "~/components/trivia";
import { getDailyTrivia } from "~/services/trivia-service";

export default async function HomePage() {
  const trivia = await getDailyTrivia();

  return <Trivia trivia={trivia} />;
}
