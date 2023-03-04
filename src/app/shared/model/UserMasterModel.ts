import { UserOrgMapping } from "./user";

export class UserMasterModel{
    userName!:string;
    userRoleID!:number;
    password!:string;
    employeeId!:number;
    employeeName!:string;
    roleName!:string;
    employeeCode!:string;
    userOrgMapping:UserOrgMapping[]=[];
}