import { categorys, custInfo, custInfos, customer, products } from "../model/UtilityModel";

import { BasicApiService } from "./basic-api.service";
import { Injectable } from "@angular/core";
import { __param } from "tslib";

@Injectable()
export class kjtiService extends BasicApiService {

  getCategorys() {


    ///api/Object/GetContact?accountid=4305f204-4203-ed11-82e6-000d3a81c2c0&keyword=
    return this.http.get<Array<categorys>>("~/api/customers/GetCategories");
  }

  getCustomers() {


    ///api/Object/GetContact?accountid=4305f204-4203-ed11-82e6-000d3a81c2c0&keyword=
    return this.http.get<Array<customer>>("~/api/customers/GetCustomers");
  }

  getproducts(categoryID) {


    ///api/Object/GetContact?accountid=4305f204-4203-ed11-82e6-000d3a81c2c0&keyword=
    return this.http.get<Array<products>>("~/api/customers/GetProducts?categoryID=" + categoryID);
  }

  ceateformdata() {

    let data: custInfos = {
      address: "123",
      companyName: "345",
      phoneNumber: "678",
    };

    ///api/Object/GetContact?accountid=4305f204-4203-ed11-82e6-000d3a81c2c0&keyword=
    return this.http.post<custInfos>("~/api/customers/CreateTestData", data);
  }
}
