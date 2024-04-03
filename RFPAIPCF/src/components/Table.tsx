import React, { useState } from "react";
import "../styles/tableStyles.css";
import { Modal, Button, Input } from "antd";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";

interface TableProps {
  data: ResponseData[];
}

interface ResponseData {
  id: string;
  requirement: string;
  seerRequirement: string;
  seerRFPResponse: string;
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handlePopUpOpen = () => {
    setIsModalOpen(true);
  };

  const handlePopUpCancel = () => {
    setIsModalOpen(false);
  };

  const handlePopUpSubmit = () => {
    setIsModalOpen(false);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };
  return (
    <>
      <table className="custom-table">
        <thead>
          <tr>
            <th>REQUIREMENTS</th>
            <th>SEER REQUIREMENTS</th>
            <th>SEER RFP RESPONSE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{row.requirement}</td>
              <td>
                <Button>
                  {row.seerRequirement} <CloseCircleOutlined />
                </Button>
                <Button
                  className="popUpBtn"
                  icon={<PlusOutlined />}
                  onClick={handlePopUpOpen}
                />
              </td>
              <td>{row.seerRFPResponse}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Enter Your Text"
        open={isModalOpen}
        onOk={handlePopUpSubmit}
        onCancel={handlePopUpCancel}
      >
        <Input.TextArea
          className="modalTextArea"
          rows={6}
          placeholder="Enter Your Text Here..."
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />
      </Modal>
    </>
  );
};

export default Table;
