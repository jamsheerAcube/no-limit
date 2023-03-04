import { ReportNumbers } from "./ReportNumbers";

export class ReportTitle {
    GetReportTitle(reportType: ReportNumbers) {
        let output: string = '';
        switch (reportType) {
            case ReportNumbers.assethistoryreport: {
                output = 'Asset History Report';
                break;
            }
            case ReportNumbers.assetregisterreport: {
                output = 'Asset Register Report';
                break;
            }
            case ReportNumbers.locationwisereport: {
                output = 'Asset Count - Location Wise Report';
                break;
            }
            case ReportNumbers.categorywisereport: {
                output = 'Asset Count - Category Wise Report';
                break;
            }
            case ReportNumbers.categorywisevaluereport: {
                output = 'Asset Value - Category Wise Report';
                break;
            }
            case ReportNumbers.assetcountstatuswisereport: {
                output = 'Asset Count - Asset Status Wise Report';
                break;
            }
            case ReportNumbers.departmentwisereport: {
                output = 'Asset Listing - Department Wise Report';
                break;
            }
            case ReportNumbers.employeewisereport: {
                output = 'Asset Listing - Employee Wise Report';
                break;
            }
            case ReportNumbers.productsummaryreport: {
                output = 'Product wise Summary Report';
                break;
            }
            default :
               break;
        }

        return output;
    }
}