import { useState, useEffect, useCallback, useRef } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ text, speed = 50, delay = 0, onComplete }: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Sync ref with the latest onComplete callback
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startTyping = useCallback(() => {
    // Prevent re-triggering if already typing or completed for the same text
    setIsTyping(true);
    setDisplayText("");
    setIsComplete(false);

    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]); // Removed onComplete from dependencies

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  return { displayText, isTyping, isComplete };
}
