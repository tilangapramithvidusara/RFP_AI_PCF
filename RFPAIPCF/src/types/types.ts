export interface TableProps {
  data: ResponseData[];
}

export interface ResponseData {
  id: string;
  requirement: string;
  seerRequirement: string;
  seerRFPResponse: string;
}
