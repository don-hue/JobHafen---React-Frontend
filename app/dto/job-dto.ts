import { Url } from "url";

export interface JobDto {
    id: number;
    jobTitle: string;
    applied: boolean;
    companyName: string;
    companyHomepage: Url; 
}