export class User {
    id: number = 0;
    userName: string = '';
    password: string = '';
    companyCode: string = '';
    companyID: string = '';
    authData?: string = '';
    userOrgMapping:UserOrgMapping[]=[];
}

export class UserOrgMapping
{
    orgID!:any;
    userName!:string;
    orgCode!:string;
    orgName!:string;
}
