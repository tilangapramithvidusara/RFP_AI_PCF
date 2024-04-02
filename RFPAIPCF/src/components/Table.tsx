import React from 'react';
import '../styles/tableStyles.css';

interface TableProps{
    data: ResponseData[];
}

interface ResponseData {
    id: string;
    requirement: string;
    seerRequirement: string;
    seerRFPResponse: string;
}

const Table: React.FC<TableProps> = ({data}) => {

  return (
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
          <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{row.requirement}</td>
            <td>{row.seerRequirement}</td>
            <td>{row.seerRFPResponse}</td>
          </tr>
         ))}
      </tbody>
    </table>
  );
}

export default Table;