import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {  } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map,delay,catchError,tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BanService {

  public getBusinessSegment():Observable<any> { 
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/ban/businessSegment");
  }
  
  public getOperatingLedger():Observable<any> { 
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/ban/bucbiz");
  }

  public getBanDetails():Observable<any> { 
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/ban/ban-details");
  }

  public getAllFocusGroups(): Observable<any> {
    return this.http.get(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/focusGroup`);
  }

  public getVendorConfigDetails(): Observable<any> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/vendorconfig-details");
  }

  public getBuyerDetails(): Observable<any> {
    return this.http.get(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/buyer/buyer-details`);
  }

  public getBillingModelDetails(): Observable<any> {
    return this.http.get(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/ban/billingModel-details`);
  }

  public getBillingModelTypes(): Observable<any> {
    return this.http.get(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/ban/billingModelTypes`);
  }

  public getAllLocationsByCountry({ billedToLocationId }): Observable<any> {
    return this.http.get(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/locations/${billedToLocationId}`);
  }

  public upsertBan(banInsertData): Observable<any> {
    return this.http.post(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/ban/bans`, banInsertData);
  }

  public getServicetypeData(): Observable<Object> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/serviceTypesData");
  }

  public getVendorServiceType(vendorServiceType):Observable<Object> { 
    return this.http.post(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/fetchServiceType",vendorServiceType);
  }

  public getServiceType(banInsertData): Observable<Object> {
    return this.http.post(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/fetchServiceType", banInsertData);
  }

  public getOtherServiceDet(banInsertData): Observable<Object> {
    return this.http.post(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/getOtherServiceType", banInsertData);
  }

  public getBanById(banId): Observable<Object> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/ban/banById/"+banId);
  }

  public getbanProductById(banId): Observable<Object> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/ban/banProductById/"+banId);
  }

  public upsertBanProduct(serviceList,banId): Observable<any> {
    return this.http.post(environment.APP_BASE_URL_SERVICE_ENDPOINT+"/ban/banProducts/"+banId, serviceList);
  }

  public getTaregtServiceType(banId): Observable<Object> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/getTargetServiceType/"+banId);
  }

  public getTaregtServiceBanProductDetails(system,banId): Observable<Object> {
    return this.http.post(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/ban/TargetServiceType-details/"+banId,system);
  }
  
  public getSourceServiceType(banInsertData,banId): Observable<Object> {
    return this.http.post(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/getSourceServiceType/"+banId,banInsertData);
  }

  public getBillHubRefID(regKey,requestorSSO,entityTypeID):Observable<any> { 
    return this.http.get(environment.APP_BILLHUB_URL_SERVICE_ENDPOINT+
      "/GetBillHubRefID?regKey="+regKey+
      "&requestorSSO="+requestorSSO+
      "&entityTypeID="+entityTypeID
    );
  }
  public getBillRefIDTokensAssociated(billRefId, regKey) : Observable<Object>{

    return this.http.get(environment.APP_BILLHUB_URL_SERVICE_ENDPOINT+
    "/ValidateBillRefTokens?billRefId="+billRefId+"&regKey="+regKey
  
    );
  }

  public validateBillRefTokens(billRefId, regKey): Observable<any> {
    return this.http.get(`${environment.APP_BILLHUB_URL_SERVICE_ENDPOINT}/ValidateBillRefTokens?billRefId=${billRefId}&regKey=${regKey}`)
  }

  public associateBillReftoAsset(billRefId, assetID, regkey):Observable<Object> { 
    return this.http.get(environment.APP_BILLHUB_URL_SERVICE_ENDPOINT+
      "/AssociateBillReftoAsset?billRefAssetArray="+billRefId+","+
      assetID+
      "&regKey="+regkey
    );
  }
  private handleError(error){
    return throwError(error + "UrlConstants.SERVER_ERROR");
  }


  constructor(private http: HttpClient) { }


 
  public getCloneBillingModelTypes(banId): Observable<Object> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/ban/billingModelTypes/"+banId);
  }

  public modeChange(banInsertData): Observable<any> {
    return this.http.post(`${environment.APP_BASE_URL_SERVICE_ENDPOINT}/ban/banMode`, banInsertData);
  }

  public getUserData(): Observable<Object> {
    return this.http.get(environment.APP_BASE_URL_SERVICE_ENDPOINT + "/UserDetails");
   }

  public getRequestIdBillHub(regKey): Observable<any> {
    return this.http.get(`${environment.APP_BILLHUB_URL_SERVICE_ENDPOINT}/GetRequestId?regKey=${regKey}`)
  }
}