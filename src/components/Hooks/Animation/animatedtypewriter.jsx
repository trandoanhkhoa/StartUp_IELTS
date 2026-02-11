import { useEffect, useRef, useState } from "react";

export const useTypewriter = (text, speed = 80) => {
  const [displayed, setDisplayed] = useState("");

  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      return;
    }

    // Giữ nguyên khoảng trắng + xuống dòng
    const words = text.split(/(\s+)/);

    indexRef.current = 0;
    setDisplayed("");

    const type = () => {
      if (indexRef.current >= words.length) return;

      const nextWord = words[indexRef.current];

      // 🛑 Chặn tuyệt đối undefined
      if (nextWord !== undefined) {
        setDisplayed((prev) => prev + nextWord);
      }

      indexRef.current += 1;
      timeoutRef.current = setTimeout(type, speed);
    };

    type();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [text, speed]);

  return displayed;
};
