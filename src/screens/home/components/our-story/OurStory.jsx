import AnimatedTextSVG from "../../../../components/animation/AnimatedTextSVG";
import FrequentQuestionsCard from "../ui/FrequentQuestionsCard";
import OurStoryAccordianCard from "../ui/OurStoryAccordianCard";
import FounderMessage from "./FounderMessage";

function OurStory() {
  const content = [
    {
      id: 1,
      title: "Become Part of Our Story: Ask, Learn, Share",
      content: <FrequentQuestionsCard />,
    },
    {
      id: 2,
      title: "Building the Future: Exploring the Founder's Motivations",
      content: <FounderMessage />,
    },
  ];
  return (
    <article className="max-md:container md:w-11/12 flex flex-col items-center justify-center">
      <h1
        className="text-2xl 2xl:text-3xl text-end"
        role="heading"
        aria-level="1"
        aria-labelledby="ourstory"
      >
        <span>
          <AnimatedTextSVG text={"Our Story"} className={"w-full h-fit"} />
        </span>
      </h1>
      <OurStoryAccordianCard content={content} />
    </article>
  );
}

export default OurStory;
