import React from "react";

interface TextToJsonProps {
  userInputText: string;
}

const TextToJson: React.FC<TextToJsonProps> = ({ userInputText }) => {
  const jsonOutput = JSON.parse(`{ "Input_requirement": "${userInputText}" }`);
  return jsonOutput;
};

export default TextToJson;
