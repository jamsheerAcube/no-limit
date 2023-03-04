import { TreeviewItem } from "ngx-treeview";
import { CommonValueListService } from "src/app/core/service/commonlistvalue.service";
import { DepartmentmasterService } from "src/app/core/service/departmentmaster.service";
import { EmployeeMasterService } from "src/app/core/service/employeemaster.service";
import { LocationmasterService } from "src/app/core/service/locationmaster.service";
import { ProductMasterService } from "src/app/core/service/productmaster.service";
import { CommonValueListModel } from "../model/CommonValueListModel";
import { DepartmentMasterModel } from "../model/DepartmentMasterModel";
import { EmployeeMasterModel } from "../model/EmployeeMasterModel";
import { LocationMasterModel } from "../model/LocationMasterModel";
import { ProductMasterModel } from "../model/ProductMasterModel";

export class TreeViewBuilder {
  productCodes!: ProductMasterModel[];
  locationCodes!: LocationMasterModel[];
  commonValueListCodes!: CommonValueListModel[];
  departmentCodes!: DepartmentMasterModel[];
  employeeCodes!: EmployeeMasterModel[];
  constructor() {

  }



  async GetProductTreeviewItems(productMasterService: ProductMasterService): Promise<TreeviewItem[]> {

    this.productCodes = await productMasterService.getProductMaster();

    const generateChild = (arr: any) => {
      return arr.reduce((acc: any, val: any, ind: any, array: any) => {
        const children: TreeviewItem[] = [];
        array.forEach((el: any, i: any) => {
          if (el.assetSubCategoryId === val.assetSubCategoryId) {
            children.push(new TreeviewItem({ text: el.productName, value: el.productId, checked: false }));
          };
        });
        return acc.concat({ ...val, children });
      }, []);
    };
    let categoryTree = generateChild(this.productCodes);

    categoryTree = categoryTree.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.assetSubCategoryId === v.assetSubCategoryId)) === i);

    return categoryTree.map((item: any) => {
      return new TreeviewItem({ text: item.assetSubCategoryName, value: item.assetSubCategoryId, collapsed: false, children: item.children, checked: false });
    });


  }

  async GetEmployeeTreeviewItems(employeeMasterService: EmployeeMasterService): Promise<TreeviewItem[]> {
    this.employeeCodes = await employeeMasterService.getEmployeeMaster();
    const generateChild = (arr: any) => {
      return arr.reduce((acc: any, val: any, ind: any, array: any) => {
        const children: TreeviewItem[] = [];
        array.forEach((el: any, i: any) => {
          if (el.departmentId === val.departmentId) {
            children.push(new TreeviewItem({ text: el.firstName, value: el.employeeId, checked: false }));
          };
        });
        return acc.concat({ ...val, children });
      }, []);
    };
    let categoryTree = generateChild(this.employeeCodes);
    categoryTree = categoryTree.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.departmentId === v.departmentId)) === i);
    return categoryTree.map((item: any) => {
      return new TreeviewItem({ text: item.departmentName, value: item.departmentId, collapsed: false, children: item.children, checked: false });
    });
  }


  async GetDepartmentTreeviewItems(departmentmasterService: DepartmentmasterService): Promise<TreeviewItem[]> {
    this.departmentCodes = await departmentmasterService.getDepartmentMaster();
    return this.departmentCodes.map((item: any) => {
      return new TreeviewItem({ text: item.departmentName, value: item.departmentID, collapsed: false, checked: false });
    });
  }
  async GetAssetStatusTreeviewItems(commonValueListService: CommonValueListService): Promise<TreeviewItem[]> {
    this.commonValueListCodes = await commonValueListService.getAssetStatusItems();
    return this.commonValueListCodes.map((item: any) => {
      return new TreeviewItem({ text: item.displayText, value: item.value, collapsed: false, checked: false });
    });

  }
  async GetLocationTreeviewItems(locationMasterService: LocationmasterService): Promise<TreeviewItem[]> {
    this.locationCodes = await locationMasterService.getLocationMaster();
    const generateLocationChild = (arr: any) => {
      return arr.reduce((acc: any, val: any, ind: any, array: any) => {
        const roomArr: TreeviewItem[] = [];
        const buildingArr: TreeviewItem[] = [];
        const floorArr: TreeviewItem[] = [];
        const locationArr: TreeviewItem[] = [];
        const locationList: TreeviewItem[] = [];

        const roots: any = [];
        var found: boolean = false;
        array.forEach((el: any, i: any) => {
          let siteGroup: any;
          let buildingGroup!: any;
          let floorGroup: any;
          let roomGroup: any;
          let locationGroup: any;
          if (acc.some((item: any) => item.siteID === val.siteID)) {
            found = false;
            siteGroup = acc.filter((e: any) => e.siteID === el.siteID)[0];
            buildingGroup = siteGroup ? siteGroup.buildingArr.filter((c: any) => c.value === el.buildingID)[0] : null;
            if (buildingGroup) {
              floorGroup = buildingGroup.children ? buildingGroup.children.filter((c: any) => c.value === el.floorID)[0] : null;
            }
            if (floorGroup)
              roomGroup = floorGroup.children ? floorGroup.children.filter((c: any) => c.value === el.roomID)[0] : null;
            if (roomGroup)
              locationGroup = roomGroup.children ? roomGroup.children.filter((c: any) => c.value === el.locationCode)[0] : null;

            if (siteGroup && !buildingGroup) {
              siteGroup.buildingArr.push(new TreeviewItem({ text: el.buildingName, value: el.buildingID, checked: false, children: [new TreeviewItem({ text: "", value: 0, checked: false })] }));
            }

            if (buildingGroup && !floorGroup) {
              buildingGroup.children.push(new TreeviewItem({ text: el.floorName, value: el.floorID, checked: false, children: [new TreeviewItem({ text: "", value: 0, checked: false })] }));

            }

            if (floorGroup && !roomGroup) {
              floorGroup.children.push(new TreeviewItem({ text: el.roomName, value: el.roomID, checked: false, children: [(new TreeviewItem({ text: "", value: 0, checked: false }))] }));
            }

            if (roomGroup && !locationGroup && !found) {
              found = true;
              roomGroup.children.push(new TreeviewItem({ text: el.locationName, value: el.locationCode, checked: false }));
            }
          } else {

            if (el.siteID === val.siteID && el.locationID === val.locationID) {
              locationArr.push(new TreeviewItem({ text: el.locationName, value: el.locationCode, checked: false }));
            }
            if (el.siteID === val.siteID && el.roomID === val.roomID && el.locationID === val.locationID) {
              roomArr.push(new TreeviewItem({ text: el.roomName, value: el.roomID, checked: false, children: locationArr }));
            }
            if (el.siteID === val.siteID && el.roomID === val.roomID && el.floorID === val.floorID && el.locationID === val.locationID) {
              floorArr.push(new TreeviewItem({ text: el.floorName, value: el.floorID, checked: false, children: roomArr }));
            }
            if (el.siteID === val.siteID && el.buildingID === val.buildingID && el.floorID === val.floorID && el.roomID === val.roomID && el.locationID === val.locationID) {
              buildingArr.push(new TreeviewItem({ text: el.buildingName, value: el.buildingID, checked: false, children: floorArr }));
            }
          }
        });
        buildingArr.forEach((item: TreeviewItem, i: Number) => {
          item.checked = false;
        });
        return acc.concat({ ...val, buildingArr });
      }, []);
    };

    let locationTree = generateLocationChild(this.locationCodes);
    //console.log(locationTree);

    const filterById = (items: any, id: number) => {
      return items.reduce((accumulator: any, currentValue: any) => {
        if (currentValue.children) {
          const newCurrentValue = filterById(currentValue.children, id)
          currentValue = { ...currentValue, children: newCurrentValue }
        }
        if (currentValue.value !== id) {
          currentValue.checked = false;
          return [...accumulator, currentValue]
        }
        return accumulator
      }, [])
    }

    const filtered = locationTree.map((item: any) => {
      return new TreeviewItem({ text: item.siteName, value: item.siteID, collapsed: false, children: item.buildingArr, checked: false });
    });
    console.log(filtered);
    const removedTree = filtered.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.value === v.value)) === i);
    console.log(removedTree);
    const newTree = filterById(removedTree, 0);


    console.log(newTree);
    const generatedTree = newTree.map((item: any) => {
      return new TreeviewItem({ text: item.text, value: item.value, collapsed: false, children: item.children, checked: false });
    });
    return generatedTree;

  }


}