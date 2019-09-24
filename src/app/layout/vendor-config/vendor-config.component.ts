import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { VendorConfigService } from './vendor-config.service';
import { ServiceTypeService } from '../service-type/service-type.service';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendor-config',
  templateUrl: './vendor-config.component.html',
  styleUrls: ['./vendor-config.component.scss']
})
export class VendorConfigComponent implements OnInit {
  
public vendorReferenceData : any;
vendorReferenceDataList :SelectItem[] = [];
public countryCodeReferenceData: any;
countryCodeReferenceDataList: SelectItem[] = [];
public currencyCodeReferenceData: any;
currencyCodeReferenceDataList: SelectItem[] = [];
public currencyReferenceData: any;
currencyReferenceDataList:SelectItem[] = [];

public vendorGridDataList :SelectItem[] = [];


lldCoeList : SelectItem[] =[
  { label: "Y", value: "Y" },
  { label: "N", value: "N" },
  { label: "L", value: "L" }  
];

public vendorGridData : any;
public dwnVendor:any;
public reportHeader : any =[];
public fileName : string ="VendorConfig";

public popupErrorMessage : any;
public errorMessage :any;
public saveMessage: any = [];
@ViewChild('content1') errorMessagePopUp;
closeResult: string;
public editFlag: boolean;

public vendorConfigDto : any ={vendorConfigId:0,
vendorEntityId:"",
vendorLegalEntityName:"",
vendorCode:"",
billedFromLocationId:"",
billedToLocationId:"",
currencyCode:"",
active:true,
dateFormat:"",
lldCoeFlag:"",
exchangeRateType:"",
vendorContactEmail:"",
paymentApprovalEmail:"",
expectedFeedDate:"",
finalInvoiceDate:"",
reportingSecurityDl:"",
created:"",
createdBy:"",
lastUpdated:"",
lastUpdatedBy:""
};

public cols = [
  { field: 'vendorLegalEntityName', header: 'Vendor Legal Entity Name', width: '40%' },
  { field: 'currencyCode', header: 'Currency Code', width: '12%' },
  { field: 'billedFromCountry', header: 'Billed From', width: '18%' },
  { field: 'billedToCountry', header: 'Billed To', width: '18%' },
  { field: 'vendorCode', header: 'Vendor Code', width: '12%' },
  { field: 'updatedBy', header: 'Updated By', width: '10%' },
  { field: 'lastUpdated', header: 'Updated Date', width: '16%' },

];

constructor( private vendorConfigService: VendorConfigService, private serviceTypeService : ServiceTypeService,private modalService: NgbModal) {
    
   }

ngOnInit() { 
    this.setReportHeader();
    this.getAllVendorsData();
    this.getAllCountryData();
    this.getAllCurrencyData();
    this.getVendorDetailGridData();
}


setReportHeader()
{
  for(let col of this.cols )
  {
    this.reportHeader.push(col.header);
  }
}

getAllVendorsData() {
  this.vendorConfigService.getAllVendors().subscribe(
    refData => {
      let arr: any = [];
      this.vendorReferenceData = refData;
      for (let data of this.vendorReferenceData) {
        this.vendorReferenceDataList.push({ label: data.vendorLegalEntityName, value: data.vendorEntityId })
      }
    },
    error => {
    });
}

getAllCurrencyData() {
  this.vendorConfigService.getAllCurrency().subscribe(
    refData => {
      this.currencyReferenceData = refData;
      for (let data of this.currencyReferenceData) {
        this.currencyReferenceDataList.push({ label: data.currencyCode, value: data.currencyDescription })
      }
    },
    error => {
    });
}

getAllCountryData(){
  this.vendorConfigService.getAllCountryCode().subscribe(
    refData => {
      let arr: any = [];
      this.countryCodeReferenceData = refData;

      for (let data of this.countryCodeReferenceData) {
        let labelCountry = data.countryCode + " | " + data.countryName;
        this.countryCodeReferenceDataList.push({ label: labelCountry, value: data.countryId })
      }
    },
    error => {
    });
}

getVendorDetailGridData() {
  this.vendorConfigService.getVendorGridData().subscribe(
    refData => {
      this.vendorGridData = refData;
      this.dwnVendor=refData;
    },
    error => {
    });
}

clearAllFilters() {
  this.errorMessage = "";
  this.editFlag = false;
  this.vendorConfigDto={vendorConfigId:0,
    vendorEntityId:"",
    vendorLegalEntityName:"",
    vendorCode:"",
    billedFromLocationId:"",
    billedToLocationId:"",
    currencyCode:"",
    active:true,
    dateFormat:"",
    lldCoeFlag:false,
    exchangeRateType:"",
    vendorContactEmail:"",
    expectedFeedDate:"",
    finalInvoiceDate:"",
    reportingSecurityDl:"",
    created:"",
    createdBy:"",
    lastUpdated:"",
    lastUpdatedBy:""
    };
  this.popupErrorMessage = "";
  this.getVendorDetailGridData();
}

upsertVendorConfig(){
  this.errorMessage = "";
  console.log("upsert vendor config id selected :",this.vendorConfigDto.vendorEntityId);
  if (this.validation()) {
    if (this.vendorConfigDto.vendorEntityId != "Select" 
    && this.vendorConfigDto.billedFromLocationId!= "Select" 
    && this.vendorConfigDto.billedToLocationId != "Select") {
      this.vendorConfigService.upsertVendorConfig(this.vendorConfigDto).subscribe(
        refData => {
          this.saveMessage = refData;
          console.log("upsert vendorConfig return outmap :"+this.saveMessage);
          console.log("upsert vendorConfig return message :"+this.saveMessage.message);
          this.popupErrorMessage =  this.saveMessage.message;
          this.open(this.errorMessagePopUp);
        },
        error => {
        });
    }
}
}

open(content) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

validation() {
  if (this.vendorConfigDto.vendorEntityId == null||
    this.vendorConfigDto.vendorEntityId == "Select"||
    this.vendorConfigDto.vendorEntityId == "") {
    this.errorMessage = "Please select the Vendor Name";
    return false;
  }
  if (this.vendorConfigDto.vendorCode == "") {
    this.errorMessage = "Please select Vendor Code";
     return false;
  }
  if (this.vendorConfigDto.vendorContactEmail == "") {
    this.errorMessage = "Please select Vendor Contact Email";
     return false;
  }
  if (this.vendorConfigDto.currencyCode ==null||
    this.vendorConfigDto.currencyCode == ""||
    this.vendorConfigDto.currencyCode == "Select") {
    this.errorMessage = "Please select Currency Code";
     return false;
  }
  if (this.vendorConfigDto.billedFromLocationId == null || 
    this.vendorConfigDto.billedFromLocationId == "" || 
    this.vendorConfigDto.billedFromLocationId == "Select") {
    this.errorMessage = "Please select From location ";
    return false;
  }
  if (this.vendorConfigDto.billedToLocationId == null || 
    this.vendorConfigDto.billedToLocationId == "" || 
    this.vendorConfigDto.billedToLocationId == "Select") {
    this.errorMessage = "Please select To location ";
    return false;
  }
  if (this.vendorConfigDto.dateFormat == "") {
    this.errorMessage = "Please select Date Format";
     return false;
  }
  if (this.vendorConfigDto.lldCoeFlag == "Select"||
      this.vendorConfigDto.lldCoeFlag == ""||
      this.vendorConfigDto.lldCoeFlag == null) {
    this.errorMessage = "Please select LLD Coe Flag";
    return false;
  }
  if (this.vendorConfigDto.exchangeRateType == "") {
    this.errorMessage = "Please select Exchange Rate Type";
     return false;
  }
  if (this.vendorConfigDto.paymentApprovalEmail == "") {
    this.errorMessage = "Please select Payment Approval Email";
     return false;
  }
  if (this.vendorConfigDto.expectedFeedDate == "") {
    this.errorMessage = "Please select Expected Feed Date";
     return false;
  }
  if (this.vendorConfigDto.finalInvoiceDate == "") {
    this.errorMessage = "Please select Final Invoice Date";
     return false;
  }
  if (this.vendorConfigDto.reportingSecurityDl == "") {
    this.errorMessage = "Please select Reporting Security DL";
     return false;
  }
  return true;
}

showSelectedData(vendorConfigId) {
  console.log("vendorConfig modify click :" + vendorConfigId);
  this.editFlag = true;
  this.vendorConfigDto = this.vendorGridData.filter(x => x.vendorConfigId == vendorConfigId)[0];
}

}