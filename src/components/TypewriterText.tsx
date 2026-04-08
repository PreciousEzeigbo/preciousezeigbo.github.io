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
  const { displayText, isTyping } = useTypewriter({ text, speed, delay, onComplete });

  return (
    <Tag className={className}>
      {displayText}
      <span className={`cursor-blink inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle ${!isTyping ? "opacity-0" : ""}`} />
    </Tag>
  );
};

export default TypewriterText;
