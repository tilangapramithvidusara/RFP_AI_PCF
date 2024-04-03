import React, { useState } from "react";
import { Input, Button, Flex, message, Spin } from "antd";
import "../styles/userInputStyles.css";
import TextToJson from "../utils/TextToJson";
import Table from "../components/Table";
import { GetResults } from "../api/endpoints";

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
      setLoading(false);
      if (responseON === "{No record found}") {
        message.info("Not Found");
      } else {
        const response = JSON.parse(responseON);
        if (response && response.requirement) {
          const id = response.Id;
          const requirement = response.requirement.split(",")[0].trim();
          const seerRequirement = response.requirement.split(",")[1].trim();
          const seerRFPResponse = "Seer RFP Response 1";
          const newData = [
            { id, requirement, seerRequirement, seerRFPResponse },
          ];
          setData(newData);
        } else {
          console.error(
            "Invalid response format: requirement property is missing"
          );
          message.error("Invalid response format");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error getting response", error);
      message.error("Error getting response");
    }
  };

  return (
    <div className="userInputTextArea">
      <TextArea
        rows={10}
        placeholder="Enter Your Text Here..."
        onChange={handleTextAreaChange}
      />
      <div className="submitBtn">
        <Flex gap="small" wrap="wrap">
          <Button type="primary" onClick={handleOnSubmit}>
            Submit
          </Button>
        </Flex>
      </div>
      <div>
        {loading ? <Spin /> : <Table data={data.length > 0 ? data : []} />}
      </div>
    </div>
  );
};

export default UserInput;
