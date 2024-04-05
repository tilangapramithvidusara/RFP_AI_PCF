import React, { useState } from "react";
import { Input, Button, Flex, message, Spin } from "antd";
import "../styles/userInputStyles.css";
import TextToJson from "../utils/TextToJson";
import Table from "../components/Table";
import { GetResults } from "../api/endpoints";
import languageConstants from "../constants/language.json";

const { TextArea } = Input;

const UserInput: React.FC = () => {
  const [userInputText, setUserInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInputText(e.target.value);
  };

  const handleOnSubmit = async () => {
    const jsonConvertedString = TextToJson({ userInputText });
    try {
      setLoading(true);
      const responseON = await GetResults(jsonConvertedString);
      const cleanedResponseON = responseON?.replace(/[^\x20-\x7E]/g, "").trim();
      console.log("Cleaned JSON", cleanedResponseON);
      console.log("Responnse ON", responseON);
      setLoading(false);
      if (cleanedResponseON === "{No record found}") {
        message.info(languageConstants.messages.notFound);
        setData([]);
      } else {
        const response = JSON.parse(cleanedResponseON);
        if (response && response?.requirement) {
          const id = response?.Id;
          const requirement = response?.requirement.split(",")[0].trim();
          const seerRequirement = response?.requirement.split(",")[1].trim();
          const seerRFPResponse = languageConstants?.seerResponse;
          const newData = [
            { id, requirement, seerRequirement, seerRFPResponse },
          ];
          setData(newData);
        } else {
          console.error(
            "Invalid response format: requirement property is missing"
          );
          message.error(languageConstants?.messages?.invalidFormat);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error getting response", error);
      message.error(languageConstants?.messages?.errorGettingResponse);
    }
  };

  return (
    <div className="userInputTextArea">
      <TextArea
        rows={10}
        placeholder={languageConstants?.placeholders?.userInput}
        onChange={handleTextAreaChange}
      />
      <div className="submitBtn">
        <Flex gap="small" wrap="wrap">
          <Button type="primary" onClick={handleOnSubmit}>
            {languageConstants?.buttonLabels?.submitRequirement}
          </Button>
        </Flex>
      </div>
      <div>
        {loading ? <Spin /> : data?.length > 0 && <Table data={data} />}
      </div>
    </div>
  );
};

export default UserInput;
