import React, { useState, useEffect } from "react";
import "../styles/tableStyles.css";
import { Modal, Button, Input } from "antd";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TableProps } from "../types/types";
import languageConstants from "../constants/language.json";

const Table: React.FC<TableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [seerRequirementsMap, setSeerRequirementsMap] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    console.log("Data:", data);
    const initialMap: Record<string, string[]> = {};
    data.forEach((row) => {
      initialMap[row.id] = row.seerRequirement.split(",");
    });
    console.log("Initial Map:", initialMap);
    setSeerRequirementsMap(initialMap);
  }, [data]);

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

  const handleRequirementDelete = (id: string) => {
    setSeerRequirementsMap((prevMap) => {
      const updatedMap = { ...prevMap };

      delete updatedMap[id];
      return updatedMap;
    });
  };
  return (
    <>
      <table className="custom-table">
        <thead>
          <tr>
            <th>{languageConstants?.tableHeaders?.requirements}</th>
            <th>{languageConstants?.tableHeaders?.seerRequirements}</th>
            <th>{languageConstants?.tableHeaders?.seerRfpResponse}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{row?.requirement}</td>
              <td>
                {seerRequirementsMap[row?.id]?.map((seerReq, idx) => (
                  <div key={idx}>
                    <Button className="seerReq">
                      {seerReq}{" "}
                      <CloseCircleOutlined
                        className="deleteReq"
                        onClick={() => handleRequirementDelete(row?.id)}
                      />
                    </Button>
                  </div>
                ))}
                <Button
                  className="popUpBtn"
                  icon={<PlusOutlined />}
                  onClick={handlePopUpOpen}
                />
              </td>
              <td>{row?.seerRFPResponse}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title={languageConstants?.modalTitle}
        open={isModalOpen}
        onOk={handlePopUpSubmit}
        onCancel={handlePopUpCancel}
      >
        <Input.TextArea
          className="modalTextArea"
          rows={6}
          placeholder={languageConstants?.modalPlaceholder}
          value={textAreaValue}
          onChange={handleTextAreaChange}
        />
      </Modal>
    </>
  );
};

export default Table;
