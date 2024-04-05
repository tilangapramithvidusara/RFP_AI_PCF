import React from "react";

interface TextToJsonProps {
  userInputText: string;
}

const TextToJson: React.FC<TextToJsonProps> = ({ userInputText }) => {
  const cleanedText = userInputText.replace(/[^\x20-\x7E]/g, '').trim();
  const jsonOutput = JSON.parse(`{ "Input_requirement": "${cleanedText}" }`);
  return jsonOutput;
};

export default TextToJson;
