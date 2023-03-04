export class AppMenuModel{
    menuType!:string;
    parentMenuName!:string;
    menuName!:string;
    menuCondition!:string;
    displayName!:string;
    menuText!:string;
    menuIconName!:string;
    sortOrder!:number;
    menuID!:string;
    appMenuID!:string;
    firstSubMenu!:AppSubMenuModel[];
}

export class AppSubMenuModel
{
    menuType!:string;
    parentMenuName!:string;
    menuName!:string;
    menuCondition!:string;
    displayName!:string;
    menuText!:string;
    menuIconName!:string;
    sortOrder!:number;
    menuID!:string;
    appMenuID!:string;
    secondSubMenu!:AppMenuModel[];
}