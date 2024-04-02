import React, { useState, useEffect } from "react";
import { Input, Button, Flex } from "antd";
import "../styles/userInputStyles.css";
import TextToJson from "../utils/TextToJson";
import Table from "../components/Table";

const { TextArea } = Input;

const UserInput: React.FC = () => {
  const [userInputText, setUserInputText] = useState<string>("");

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInputText(e.target.value);
  };

  const handleOnSubmit = () => {
    const jsonConvertedString = TextToJson({ userInputText });
    console.log(jsonConvertedString);
  };

  useEffect(() => {
    handleRetriveResponse();
  }, []);

  const handleRetriveResponse = () => {
    try{
        const sampleData = '{"Id":"37162143-28EE-EC11-BB3C-002248400A54", "requirement":"Depreciation budgets,Record fixed asset depreciation transactions for budgeting purposes" }';
        const responseJSON = JSON.parse(sampleData);
        const id = responseJSON.Id;
        const requirement = responseJSON.requirement.split(',')[0].trim();
        const seerRequirement = responseJSON.requirement.split(',')[1].trim();
        const seerRFPResponse = "Seer RFP Response 1"
        console.log("Requirement From RESPONSE", requirement);
        console.log("Seer Requirement from Response", seerRequirement);
        const data = [{id, requirement, seerRequirement, seerRFPResponse}];
        return data;
    } catch(error){
        console.error("Invalid Json Format:", error);
        return [];
    }
    
  }
  

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
        <Table data={handleRetriveResponse()} />
      </div>
    </div>
  );
};

export default UserInput;
