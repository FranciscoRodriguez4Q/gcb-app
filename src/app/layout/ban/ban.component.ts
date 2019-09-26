import { Component, OnInit, ViewChild } from '@angular/core';
import { BanService } from './ban.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/primeng';
import {ListboxModule} from 'primeng/listbox';
import {PickListModule} from 'primeng/picklist';
import { environment } from 'src/environments/environment.prod';	

@Component({
  selector: 'app-product',
  templateUrl: './ban.component.html',
  styleUrls: ['./ban.component.scss']
})
export class BanComponent implements OnInit {

  public gridData: any = [];
  data:any;
  files: any ={};

public vendorServiceType : any ={
  "billedToLocationId":"",
	"billedFromLocationId":"",
	"billProcessId":""
};

    public banInsertData: any = {
      billProcessName: "",
      billProcessId:"",
      vendorBan: "",
      vendorCode: "",
      vendorConfigId:"",
      vendorFriendlyName: "",
      buyerId:"",
      buyerName: "",
      billingModel: "",
      mode: "",
      invoiceBuyerLeName: "",
      active: "",
      activeTo: "",  
      goldIdOverrideFlag: "",
      overrideGoldId: "",
      liquidateBillRoutingId: "",
      directOffsetBuc: "",
      indirectOffsetBuc: "",
      isEquipment: "",
  
      erpName: "",
      erpSystem: "",
      erpProject: "",
      erpTask: "",
      erpAwtGroupName: "",
      erpVatAwtGroupName: "",
      erpPaymentTerms: "",
      erpVendorGsl: "",
      erpVendorSiteCode: "",
      erpGuiDiff: "",
      erpCustRegNumber: "",
      vatUnspsc: "",
      buyerPaymentApprovalEmail: "",
      buyerContactSso: "",
      focusGroup: "",
      shipFromAddress: "",
      shipToCountry: 0,
      shipToProvince: "",
      shipToState: "",
      shipToCity: "",
      shipToZip4: "",
      shipTozip5: "",
      addCountryISOtoVendorName: "",
      useAssetFileVendorName: "",
      liquidateBillRoutingIdServiceType: ""
      
    };
  

  billProcessReferenceList: SelectItem[] = [];
  public billProcessReference: any;
  public banId: any;
  public vendorBan: any;
  public vendorConfigId: any;
  public vendorCode: any;
  public serviceTypeId: any;
  public serviceTypeName: any;
  public buyerId:any;
  public erpBuyerLeName:any;
  public liquidateBillRoutingId:any;
  public updatedBy: any;
  public lastUpdated: any;
  public errorMessage = "";
  public gridLoadFlag:boolean=false;
  banData:any = [];
  banDwnData:any = [];
  public downloadCols = [];
  public fileName : any ="Ban";
  public saveMessage: any = [];
  public popupErrorMessage: any;
  public editFlag = false;
  @ViewChild('content1') errorMessagePopUp;
  closeResult: string;
  public formMode="New";
  public sourceSystem:any = [];
  public targetSystem:any = [];
  public countryCodeReferenceData: any;
  countryCodeReferenceDataList: SelectItem[] = [];
  public index = [];
  public expansionEventFlag = true;
  public collapsed=true;
  public panelExpansionFlag=true;
  public focusReferenceData: any;
  focusReferenceDataList: SelectItem[] = [];
  public serviceTypeReferenceData: any;
  serviceTypeReferenceDataList: SelectItem[] = [];
  public vendorReferenceData: any;
  vendorReferenceDataList: SelectItem[] = [];
  productReferenceDataList: SelectItem[] = [];
  public buyerReferenceData: any;
  buyerReferenceDataList: SelectItem[] = [];
  billingReferenceDataList: SelectItem[] = [];
  modeReferenceDataList: SelectItem[] = [];
  public billingModelReferenceData: any;
  public billProcessReferenceData:any;
  otherServiceData:any = [];
  public costCenter:any;
  public unspsc:any;
  serviceTypeInsertData:any=[];

  public regKey = "8c8606d1-e591-435f-a435-d112ba4cd43c";		
  public entityTypeID = "5";

  constructor(private banService: BanService,private modalService: NgbModal) { }
  

  public cols = [
    { field: 'vendorBan', header: 'Ban ID', width: '20%' },
    { field: 'vendorCode', header: 'Vendor Name', width: '5%' },
    { field: 'serviceTypeName', header: 'Service Type Name', width: '10%' },
    { field: 'erpBuyerLeName', header: 'Buyer Name', width: '20%' },
    { field: 'liquidateBillRoutingId', header: 'Bill Rote ID', width: '10%' },
    { field: 'updatedBy', header: 'Updated By', width: '10%' },
    { field: 'lastUpdated', header: 'Updated Date', width: '10%' },
  ];

 

  ngOnInit() {
    this.getAllBanDetails();
    for (let i = 0; i < this.cols.length; i++) {
      // console.log("in Download method"+i);
      this.downloadCols.push(this.cols[i].header);
    }    
    this.getAllCountryData();
    this.getAllFocusGroups();
    this.getAllVendorConfig();
    this.getAllProcessDet();
    this.getAllBuyers();
    this.getAllBillingModel();
    this.getAllModel();
  }

  getAllBanDetails() {
    this.banService.getBanDetails().subscribe(
      refData => {
        this.banData=refData;
        this.gridLoadFlag = true;

        this.banData.map(item => {
          return {
            banId:this.banId,
            vendorCode:this.vendorCode,
            serviceTypeName:this.serviceTypeName,
            erpBuyerLeName:this.erpBuyerLeName,
            liquidateBillRoutingId:this.liquidateBillRoutingId,
            updatedBy:this.updatedBy,
            lastUpdated:this.lastUpdated,
          }
      }).forEach(item => this.banDwnData.push(item));
      },
      error => {
      });
  }

  showSelectedData(banId) {
    console.log("radio button click" + this.banId);
    this.editFlag = true;
    this.formMode="Modify";
    this.banService.getBanById(banId).subscribe(
      refData => {
        this.banInsertData = refData;
      },
      error => {
      });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  clearAllFilters(){
    this.banInsertData={
      
    }
    this.errorMessage ="";
  }

  validation(){    
    if(this.banInsertData.billProcessId==0){
      this.errorMessage = "Please Select Bill Process";
      return false;
    }
    if(this.banInsertData.vendorBan==""){
      this.errorMessage = "Please Enter Vendor Ban";
      return false;
    }
    if(this.banInsertData.vendorConfigId==0){
      this.errorMessage = "Please Enter Vendor Code";
      return false;
    }
    if(this.banInsertData.buyerId==0){
      this.errorMessage = "Please Select Buyer Name";
      return false;
    }
    if(this.banInsertData.mode==""){
      this.errorMessage = "Please Select Mode";
      return false;
    } 

     else{
      return true;
   }
  }

  upsertBan() {
    this.errorMessage = "";
    if (this.validation()) {
      // this.banService.getBillRefIDTokensAssociated(this.banInsertData.liquidateBillRoutingId,
      //   this.regKey).subscribe(
      // refData => {
      //   let response = refData;
      //   let respArray = [];
      //   respArray.push(response);
      //   console.log(response);
      //   if (respArray[0].message === "No Tokens Associated") {
      //     this.errorMessage = respArray[0].message;
      //     this.popupErrorMessage = respArray[0].message;
      //     this.open(this.errorMessagePopUp);
          
      //   }
      //   else   if (respArray[0].message === "BillRef does not exist"){
      //     this.errorMessage = "Please Enter BUC/ADN details";
      //     this.popupErrorMessage = "Please Enter BUC/ADN details";
      //     this.banInsertData.liquidateBillRoutingId = "";
      //     this.open(this.errorMessagePopUp);
         
      //   }
      //   else {
      this.banService.upsertBan(this.banInsertData).subscribe(
        refData => {
          this.saveMessage = refData;
          this.popupErrorMessage =  this.saveMessage.statusMessage;
          this.open(this.errorMessagePopUp);
          this.getAllBanDetails();
          this.clearAllFilters();
        },
        error => {
        });
      }
    // },
    // error => {
    // });
    // }
    else{
      //this.open(this.errorMessage);
    }
  }

  

  getAllCountryData(){
    this.banService.getAllCountryCode().subscribe(
      refData => {
        let arr: any = [];
        this.countryCodeReferenceData = refData;
        this.countryCodeReferenceDataList.push({ label: "Select", value: "Select" })  
        for (let data of this.countryCodeReferenceData) {
          let labelCountry = data.countryCode + " | " + data.countryName;
          this.countryCodeReferenceDataList.push({ label: labelCountry, value: data.countryId })
        }
      },
      error => {
      });
  }

  getAllFocusGroups(){
    this.banService.getAllFocusGroups().subscribe(
      refData => {
        let arr: any = [];
        this.focusReferenceData = refData;
        for (let data of this.focusReferenceData) {
          let labelFocus = data.focusGroupName;
          this.focusReferenceDataList.push({ label: labelFocus, value: data.focusGroupId })
        }
      },
      error => {
      });
  }

  getVendorServiceType()
  {
    if(this.banInsertData.vendorConfigId!=null || this.banInsertData.vendorConfigId!="Select")
    {
      console.log("selected vendorConfig:",this.banInsertData.vendorConfigId);
      let vendorConfigObj = this.vendorReferenceData.filter(x => x.vendorConfigId == this.banInsertData.vendorConfigId)[0];
      
      this.vendorServiceType.billedToLocationId=vendorConfigObj.billedToLocationId;
      this.vendorServiceType.billedFromLocationId=vendorConfigObj.billedFromLocationId;
      this.vendorServiceType.billProcessId=vendorConfigObj.billProcessId;

      this.banService.getVendorServiceType(this.vendorServiceType).subscribe(
          refData =>{
            this.serviceTypeReferenceData = refData; 
        this.sourceSystem=this.sourceSystem.concat(refData); 
        for (let data of this.serviceTypeReferenceData) {
          let labelService = data.serviceTypeName;
          this.serviceTypeReferenceDataList.push({ label: labelService, value: data.serviceTypeId })
        }
          },
          error=>
          {

          }
);

    }
  }

  getAllVendorConfig() {
    this.banService.getVendorConfigDetails().subscribe(
      refData => {
        let arr: any = [];
        this.vendorReferenceData = refData;  
        for (let data of this.vendorReferenceData) {
          let labelService = data.vendorCode+' | '+data.billedFromCountryCode+' | '+data.billedToCountryCode+' | '
          +data.currencyCode+' | '+data.vendorLegalEntityName;
          this.vendorReferenceDataList.push({ label: labelService, value: data.vendorConfigId })
        }
      },
      error => {
      });      
  }

  getAllProcessDet(){  

    this.banService.getBillProcessList().subscribe(
      refData => {
        let arr: any = [];
        this.billProcessReference = refData;
        for (let data of this.billProcessReference) {
          this.billProcessReferenceList.push({ label: data.processName, value: data.billProcessId })
        }
      },
      error => {
      });    
  }

  getAllBuyers(){
    this.banService.getBuyerDetails().subscribe(
      refData => {
        let arr: any = [];
        this.buyerReferenceData = refData;  
        for (let data of this.buyerReferenceData) {
          let labelService = data.erpBuyerLeName;
          this.buyerReferenceDataList.push({ label: labelService, value: data.buyerId })
        }
      },
      error => {
      });
  }

  getAllBillingModel(){
    //this.billingReferenceDataList.push({ label: "Select", value: "Select" });
    // this.billingReferenceDataList.push({ label: "Sabrix", value: "SABRIX" });
    // this.billingReferenceDataList.push({ label: "PayMaster", value: PAYMASTER" });
    // this.billingReferenceDataList.push({ label: "CoE Liquidation", value: "COE LIQUIDATION" });
    this.banService.getBillingModelDetails().subscribe(
      refData => {
        let arr: any = [];
        this.billingModelReferenceData = refData;  
        for (let data of this.billingModelReferenceData) {
          let labelService = data.billingModelDesc;
          this.billingReferenceDataList.push({ label: labelService, value: data.billingModelId })
        }
      },
      error => {
      });
  }

  getAllModel(){
    //this.modeReferenceDataList.push({ label: "Select", value: "Select" });
    this.modeReferenceDataList.push({ label: "PRODUCTION", value: "PRODUCTION" });
    this.modeReferenceDataList.push({ label: "TEST", value: "TEST" });
  }

  /**
   * Private Method to get popup dismissed reason Can be removed if not needed.
   * @param: reason: $event.
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  expandAllPanels(){
    this.index = [0,1,2,3,4,5,6,7];
    this.collapsed=false;
    this.panelExpansionFlag=false;
  }

  collapseAllPanels(){
    this.index = [];
    this.collapsed=true;
    this.panelExpansionFlag=true;
  }
  getClearData(){
    this.banInsertData={
      billedFromLocationId:"",
      billedToLocationId:"",
    }
  }
  getServiceType(){
    this.errorMessage = "";
    if (this.banInsertData.vendorConfigId != "Select" && this.banInsertData.vendorConfigId != null) {
      let vendorConfigData=this.vendorReferenceData.filter(x => x.vendorConfigId == this.banInsertData.vendorConfigId)[0];
      this.banInsertData.billedFromLocationId=vendorConfigData.billedFromLocationId;
      this.banInsertData.billedToLocationId=vendorConfigData.billedFromLocationId;
      //console.log("Vendor Selected : " + vendorConfigData);
      //console.log("process Id "+this.banInsertData.billProcessId);
      this.banService.getServiceType(this.banInsertData).subscribe(
        refData => {
          let arr: any = [];
          this.serviceTypeReferenceData = refData; 
          this.sourceSystem=this.sourceSystem.concat(refData); 
          for (let data of this.serviceTypeReferenceData) {
            let labelService = data.serviceTypeName;
            this.serviceTypeReferenceDataList.push({ label: labelService, value: data.serviceTypeId })
          }
        },
        error => {
        })
    }
  }

  onSelectTarget(item:any){
    //this.getClearData();
    console.log("clicked"+item.items[0].serviceTypeId);
    this.systems = this.serviceList.filter(x => x.serviceTypeId == item.items[0].serviceTypeId)[0];
    console.log(this.systems);
    
    //trigger events
    this.triggerUnspscEvent(this.systems.unspscOverrideFlag);
    this.triggerCostCenterEvent(this.systems.costCentreOverrideFlag);
    this.triggerErpPmtEvent(this.systems.erpPmtOverrideFlag);
    this.triggerErpAwtGrpEvent(this.systems.erpAwtGroupNameOverrideFlag);
    this.triggerErpVatAwtEvent(this.systems.erpVatAwtGroupOverrideFlag);
    this.triggerDirOffsetEvent(this.systems.directOffsetBucOverrideFlag);
    this.triggerindirectOffsetEvent(this.systems.indirectOffsetBucOverrideFlag);
  }

  isDisabledUnspsc = true;
  isDisableCostCenter = true;
  isDisableErpPmt = true;
  isDisableErpAwtGrp = true;
  isDisableErpVatAwt = true;
  isDisableDirOSAwt = true;
  isDisableIndirOSAwt = true;
  triggerUnspscEvent(unspscOverrideFlag) {
    if(unspscOverrideFlag)
      this.isDisabledUnspsc = !this.isDisabledUnspsc;
    else
    this.isDisabledUnspsc = true;
      return;
  }
  triggerCostCenterEvent(costCentreOverrideFlag){
    if(costCentreOverrideFlag)
      this.isDisableCostCenter = !this.isDisableCostCenter;
    else
     this.isDisableCostCenter = true;
      return;
  }
  triggerErpPmtEvent(erpPmtOverrideFlag){
    if(erpPmtOverrideFlag)
    this.isDisableErpPmt = !this.isDisableErpPmt;
    else
    this.isDisableErpPmt =true;
      return;
  } 
  triggerErpAwtGrpEvent(erpAwtGroupNameOverrideFlag){
    if(erpAwtGroupNameOverrideFlag)
    this.isDisableErpAwtGrp = !this.isDisableErpAwtGrp;
    else
    this.isDisableErpAwtGrp =true;
    return;
  }
  triggerErpVatAwtEvent(erpVatAwtGroupOverrideFlag){
    if(erpVatAwtGroupOverrideFlag)
    this.isDisableErpVatAwt = !this.isDisableErpVatAwt;
    else
    this.isDisableErpVatAwt = true;
    return;
  }
  triggerDirOffsetEvent(directOffsetBucOverrideFlag){
    if(directOffsetBucOverrideFlag)
    this.isDisableDirOSAwt = !this.isDisableDirOSAwt;
    else
    this.isDisableDirOSAwt = true;
    return;
  }
  triggerindirectOffsetEvent(indirectOffsetBucOverrideFlag){
    if(indirectOffsetBucOverrideFlag)
      this.isDisableIndirOSAwt = !this.isDisableIndirOSAwt;
    else
      this.isDisableIndirOSAwt =true;
    return;
  }

  tableValueChanged(erpAwtGroupName,erpVatAwtGroupName,erpPaymentTerms,directOffsetBuc,indirectOffsetBuc){
    this.banInsertData.overrideErpPmtTerms=erpPaymentTerms;
    this.banInsertData.overrideErpAwtGroupName=erpAwtGroupName;
    this.banInsertData.overrideDirectOffsetBuc =directOffsetBuc;
    this.banInsertData.overrideIndirectOffsetBuc =indirectOffsetBuc;
    this.banInsertData.overrideErpVatAwtGroupName=erpVatAwtGroupName
  }
  public services: any=[{
    "erpPaymentTerms":"",
    "erpAwtGroupName":"",
    "directOffsetBuc":"",
    "indirectOffsetBuc":"",
    "erpVatAwtGroupName":"",
  }]
  serviceList: Array<{
    serviceTypeId: string, 
    overrideErpPmtTerms: string,
    overrideErpAwtGroupName: string,
    overrideDirectOffsetBuc: string,
    overrideIndirectOffsetBuc:string,
    overrideErpVatAwtGroupName:string,
    overrideUnspsc:string,
    overrideOffsetCostCenter:string,
    unspscOverrideFlag:boolean,
    costCentreOverrideFlag:boolean,
    erpPmtOverrideFlag:boolean,
    erpAwtGroupNameOverrideFlag:boolean,
    erpVatAwtGroupOverrideFlag:boolean,
    directOffsetBucOverrideFlag:boolean,
    indirectOffsetBucOverrideFlag:boolean,
  }> = [];

  public systems :any ={
    serviceTypeId: "", 
    overrideErpPmtTerms: "",
    overrideErpAwtGroupName: "",
    overrideDirectOffsetBuc: "",
    overrideIndirectOffsetBuc:"",
    overrideErpVatAwtGroupName:"",
    overrideUnspsc:"",
    overrideOffsetCostCenter:"",
    unspscOverrideFlag:"",
    costCentreOverrideFlag:"",
    erpPmtOverrideFlag:"",
    erpAwtGroupNameOverrideFlag:"",
    erpVatAwtGroupOverrideFlag:"",
    directOffsetBucOverrideFlag:"",
    indirectOffsetBucOverrideFlag:"",
  }; 


  addTargetValueToArray(item:any){
    console.log(item);
    for (let system of item.items){
      if (system.serviceTypeId != null) {
        this.banInsertData.serviceTypeId = system.serviceTypeId;
        this.banService.getOtherServiceDet(this.banInsertData).subscribe(
          refData => {
            this.otherServiceData=refData;
            this.serviceList.push({ serviceTypeId: system.serviceTypeId, overrideErpPmtTerms: this.banInsertData.overrideErpPmtTerms,
              overrideErpAwtGroupName:this.banInsertData.overrideErpAwtGroupName,overrideDirectOffsetBuc:this.banInsertData.overrideDirectOffsetBuc, 
              overrideIndirectOffsetBuc:this.banInsertData.overrideIndirectOffsetBuc, overrideErpVatAwtGroupName:this.banInsertData.overrideErpVatAwtGroupName,
              overrideUnspsc:this.otherServiceData.unspsc,overrideOffsetCostCenter:this.otherServiceData.costCenter,
              unspscOverrideFlag:false,costCentreOverrideFlag:false,
              erpPmtOverrideFlag:false,erpAwtGroupNameOverrideFlag:false,
              erpVatAwtGroupOverrideFlag:false,directOffsetBucOverrideFlag:false,
              indirectOffsetBucOverrideFlag:false})
        },
        error => {
        }); 
      }
    }
    console.log( this.serviceList);
  }

  removeTargetValueFromArray(item:any){
    console.log("remove"+item);
    this.systems = this.serviceList.filter(x => x.serviceTypeId == item.items[0].serviceTypeId)[0];
    var index= this.serviceList.indexOf(this.systems);
    this.serviceList.splice(index, 1);
    console.log("remove new list"+this.serviceList.length);
  }

  upsertBanService() {
    this.errorMessage = "";
    //this.msgs = [];
    console.log("test button click");
    if (this.validation()) {
      this.banService.upsertBan(this.serviceList).subscribe(
        refData => {
          this.saveMessage = refData;
          if(!this.saveMessage.Error == undefined)
            this.errorMessagePopUp = "Ban Already Exits";
          if(this.saveMessage.Error == false)
            this.errorMessagePopUp = "Ban Name "+this.serviceList+" Save Suceesfully.";
          else
            this.errorMessagePopUp =  "ban Name "+this.serviceList+" not Saved..";
          this.open(this.errorMessagePopUp);
          this.getAllBanDetails();
          this.clearAllFilters();
        },
        error => {
        });
    }else{
      //this.open(this.errorMessage);
    }
  }

  generateBillRefId() {
 
    const requestorSSO =  "999999999"; //localStorage.getItem(AppConstants.LABEL_LOGGEDIN_SSO);
  
    this.banService.getBillHubRefID(this.regKey, requestorSSO, this.entityTypeID).subscribe(
      refData => {
        let response = refData;
        let respArray = [];
        respArray.push(response);
        if (respArray[0].OUTPUT === 'FAIL')
        {
          this.popupErrorMessage = respArray[0].BillRefID;
          this.open(this.errorMessagePopUp);
        }
       else if (respArray[0].BillRefID) {
          this.banInsertData.liquidateBillRoutingId = respArray[0].BillRefID;         
          this.editBillRef();
        } 
      },
      error => {
     this.popupErrorMessage ="Internal Server Error!";
     this.open(this.errorMessagePopUp);
      });
  }

  editBillRef(){

    let sso =999999999;
     window.open( environment.APP_BILLHUB_URL_UI_ENDPOINT + 
      "/EditBillReference;billRefId="+
     this.banInsertData.liquidateBillRoutingId+";sso="+sso+";mode=edit");
   
   }
  
}
