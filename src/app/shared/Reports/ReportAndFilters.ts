import { ReportFilterTypes } from "./ReportFilterTypes";
import { ReportNumbers } from "./ReportNumbers";

export class ReportAndFilters {
    GetReportFilters(reportType: ReportNumbers) {
        let output: any[] = [];
        switch (reportType) {
            case ReportNumbers.assethistoryreport: {
                output.push(ReportFilterTypes.Product);
                // output.push(ReportFilterTypes.Brand);
                // output.push(ReportFilterTypes.Model);
                output.push(ReportFilterTypes.Location);
                break;
            }
            case ReportNumbers.productsummaryreport: {
                output.push(ReportFilterTypes.Category);
                output.push(ReportFilterTypes.Subcategory);
                output.push(ReportFilterTypes.Product);
                // output.push(ReportFilterTypes.Brand);
                // output.push(ReportFilterTypes.Model);
               // output.push(ReportFilterTypes.Location);
                break;
            }
            case ReportNumbers.assetregisterreport: {
                output.push(ReportFilterTypes.Category);
                output.push(ReportFilterTypes.Subcategory);
                output.push(ReportFilterTypes.Product);
                output.push(ReportFilterTypes.Brand);
                output.push(ReportFilterTypes.Model);
                output.push(ReportFilterTypes.Site);
                output.push(ReportFilterTypes.Building);
                output.push(ReportFilterTypes.Floor);
                output.push(ReportFilterTypes.Room);
                output.push(ReportFilterTypes.Location);
                break;
            }
            case ReportNumbers.locationwisereport: {
                output.push(ReportFilterTypes.Site);
                output.push(ReportFilterTypes.Building);
                output.push(ReportFilterTypes.Floor);
                output.push(ReportFilterTypes.Room);
                output.push(ReportFilterTypes.Location);
                break;
            }
            case ReportNumbers.categorywisereport: {
                output.push(ReportFilterTypes.Category);
                output.push(ReportFilterTypes.Subcategory);
                output.push(ReportFilterTypes.Brand);
                output.push(ReportFilterTypes.Model);
                break;
            }
            case ReportNumbers.categorywisevaluereport: {
                output.push(ReportFilterTypes.Category);
                output.push(ReportFilterTypes.Subcategory);
                output.push(ReportFilterTypes.Brand);
                output.push(ReportFilterTypes.Model);
                break;
            }
            case ReportNumbers.assetcountstatuswisereport: {
                output.push(ReportFilterTypes.AssetStatus);
                break;
            }
            case ReportNumbers.departmentwisereport: {
                output.push(ReportFilterTypes.Department);
                break;
            }
            case ReportNumbers.employeewisereport: {
                output.push(ReportFilterTypes.Employee);
                break;
            }
            default :
               break;
        }

        return output;
    }
}