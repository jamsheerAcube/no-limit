import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { AssetAuditService } from "src/app/core/service/assetaudit.service";
import { OrganizationmasterService } from "src/app/core/service/organizationmaster.service";
import { UserMasterService } from "src/app/core/service/usermaster.service";
import { userrolemasterservice } from "src/app/core/service/userrolemaster.service";
import Swal from "sweetalert2";
import { AssetVerificationService } from '../../core/service/assetverification.service';
import { CommonValueListService } from '../../core/service/commonlistvalue.service';
import { DepartmentmasterService } from '../../core/service/departmentmaster.service';
import { EmployeeMasterService } from '../../core/service/employeemaster.service';
import { LocationmasterService } from '../../core/service/locationmaster.service';
import { ProductMasterService } from '../../core/service/productmaster.service';
import { AssetAuditModel } from "../model/AssetAuditModel";

@Injectable({
    providedIn: 'root'
  })
  
export class InactivateAlert{
  Clickevent = new Subject<any>();
    constructor(private router: Router,
        private route: ActivatedRoute,
        private locationMasterService: LocationmasterService,
        private orgmasterService: OrganizationmasterService,
        private departmentMasterService: DepartmentmasterService,
        private employeeMasterService: EmployeeMasterService,
        private commonValueListService: CommonValueListService,
        private productMasterService: ProductMasterService,
        private assetVerificationService: AssetVerificationService,
        private usermasterservice:UserMasterService,
        private userrolemasterservice:userrolemasterservice,
        private auditmasterService:AssetAuditService) { }
    
    InactivateConfirmBox(Id: number, entityName: string) {
        let deleteResponse: Observable<any>;
    
       
          Swal.fire({
            title: 'Are you sure you want to Inactivate?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
              deleteResponse = this.CallApiMethodToInactivate(Id, entityName) as Observable<any>;
              deleteResponse.subscribe(
                result => {
                  this.CallServiceToInactivateFromCache(Id, entityName);
                  this.SuccessMessage();
                  this.reload(entityName);
                },
                err => {
                  Swal.fire(
                    'Error',
                    err.error,
                    'error'
                  )
        
                }
              );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled'
              )
            }
          })
      }

      reload(entityName: string) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./' + entityName], { relativeTo: this.route });
      }
    
      SuccessMessage() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          icon: 'success',
          title: 'Successfully Inactivated!!!'
        });
      }

      CallApiMethodToInactivate(Id: number, entityName: string) {
        switch (entityName) {
          case 'orgmaster' : {
            return this.orgmasterService.DeleteOrganizationMaster(Id);
            break;
          }
            case 'locationmaster' : {
              return this.locationMasterService.DeleteLocationMaster(Id);
              break;
            }
            case 'departmentmaster' : {
              return this.departmentMasterService.DeleteDepartmentMaster(Id);
              break;
            }
          
            case 'employeemaster' : {
              return this.employeeMasterService.DeleteEmployeeMaster(Id);
              break;
            }
            case 'productmaster' : {
              return this.productMasterService.DeleteProductMaster(Id);
              break;
            }
            case 'usermaster' : {
              return this.usermasterservice.DeleteMaster(Id.toString());
              break;
            }
            case 'userrolemaster' : {
              return this.userrolemasterservice.DeleteMaster(Id);
              break;
            }
            // case 'assetregister' : {
            //   return this.assetRegisterService.onRefreshAssetRegister();
            //   break;
            // }
            // case 'assetverification' : {
            //   return this.assetVerificationService.onRefreshAssetVerification();
            //   break;
            // }
            default : {
                return null;
              break;
            }
          }
      }

      CallServiceToInactivateFromCache(Id: number, entityName: string) {
        switch (entityName) {
          case 'orgmaster' : {
            return this.orgmasterService.DeleteFromCache(Id);
            break;
          }
            case 'locationmaster' : {
              return this.locationMasterService.DeleteFromCache(Id);
              break;
            }
            case 'departmentmaster' : {
              return this.departmentMasterService.DeleteFromCache(Id);
              break;
            }
            case 'employeemaster' : {
              return this.employeeMasterService.DeleteFromCache(Id);
              break;
            }
           
            case 'productmaster' : {
              return this.productMasterService.DeleteFromCache(Id);
              break;
            }
            case 'usermaster' : {
              return this.usermasterservice.DeleteFromCache(Id.toString());
              break;
            }
            case 'userrolemaster' : {
              return this.userrolemasterservice.DeleteFromCache(Id);
              break;
            }
            // case 'assetregister' : {
            //   return this.assetRegisterService.DeleteFromCache(Id);
            //   break;
            // }
            // case 'assetverification' : {
            //   return this.assetVerificationService.DeleteFromCache(Id);
            //   break;
            // }
            default : {
                return null;
              break;
            }
          }
      }

      SuccessMessageClose(entityName:string) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        Toast.fire({
          icon: 'success',
          title: entityName =='auditrelease' ? 'Successfully Released!!!' :  'Successfully Closed!!!'
        });
      }

      CallApiMethodToClose(Id: any, entityName: string) {
        switch (entityName) {
          
          case 'assetaudit': {
            return this.auditmasterService.CloseAuditMaster(Id);
            break;
          }
          case 'auditrelease': {
            return this.auditmasterService.RleaseAuditMaster(Id);
            break;
          }
          default: {
            return null;
            break;
          }
        }
      }

      CallApiMethodToUpdateStatus(Id: any, entityName: string) {
        switch (entityName) {
          
          case 'assetaudit': {
            var data:AssetAuditModel=new AssetAuditModel;
            this.auditmasterService.getAssetAuditByKey(Id).subscribe(res=>{
              data=res;
              console.log(data);
              if(data!=null)
              {
                data.auditStatus=50;
                data.auditStatusText="Audit Closed";
                this.auditmasterService.AddOrEditRecordToCache(data,true);
              }
            });
           
           return 0;
            break;
          }
          case 'auditrelease': {
            var data:AssetAuditModel=new AssetAuditModel;
            this.auditmasterService.getAssetAuditByKey(Id).subscribe(res=>{
              data=res;
              if(data!=null)
              {
                data.auditStatus=40;
                data.auditStatusText="Audit Released";
                this.auditmasterService.AddOrEditRecordToCache(data,true);
              }
            });
           
           return 0;
            break;
          }
          default: {
            return null;
            break;
          }
        }
      }
    

      CloseConfirmBox(Id: any, entityName: string) {
        let deleteResponse: Observable<any>;
    
    
        Swal.fire({
          title: 'Are you sure you want to Close?',
          //text: 'You will not be able to recover this record!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            deleteResponse = this.CallApiMethodToClose(Id, entityName) as Observable<any>;
            deleteResponse.subscribe(
              result => {
                this.CallApiMethodToUpdateStatus(Id,entityName);
                this.CallServiceToInactivateFromCache(Id, entityName);
                this.auditmasterService.refreshClickevent.next();
                this.SuccessMessageClose(entityName);
               // this.reload("physicalcount");
              },
              err => {
                Swal.fire(
                  'Error',
                  err.error,
                  'error'
                )
    
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled'
            )
          }
        })
      }

      ReleaseConfirmBox(Id: any, entityName: string) {
        let deleteResponse: Observable<any>;
    
    
        Swal.fire({
          title: 'Are you sure you want to Release?',
          //text: 'You will not be able to recover this record!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            deleteResponse = this.CallApiMethodToClose(Id, entityName) as Observable<any>;
            deleteResponse.subscribe(
              result => {
                this.CallApiMethodToUpdateStatus(Id,entityName);
                this.auditmasterService.refreshClickevent.next();
                this.SuccessMessageClose(entityName);
                this.Clickevent.next();
               // this.reload("physicalcount");
             
              },
              err => {
                Swal.fire(
                  'Error',
                  err.error,
                  'error'
                )
                this.Clickevent.next();
                
              }
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled'
            )
            this.Clickevent.next();
          }
          
        })
      }

}