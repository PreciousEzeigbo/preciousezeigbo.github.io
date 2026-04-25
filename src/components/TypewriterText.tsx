import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  onComplete?: () => void;
}

const TypewriterText = ({
  text,
  speed = 50,
  delay = 0,
  className = "",
  as: Tag = "span",
  onComplete,
}: TypewriterTextProps) => {
  const { displayText, isTyping, isComplete } = useTypewriter({ text, speed, delay, onComplete });

  return (
    <Tag className={`${className} inline-flex items-baseline`}>
      {displayText}
      <span
        className={`inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle ${isTyping || isComplete ? "opacity-100 cursor-blink" : "opacity-0"
          }`}
      />
    </Tag>
  );
};

export default TypewriterText;
