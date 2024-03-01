import { BasicApiService } from "./basic-api.service";
import { Injectable } from "@angular/core";
import { categorys } from "../model/UtilityModel";

@Injectable()
export class kjtiService extends BasicApiService {

  getCategorys() {


    ///api/Object/GetContact?accountid=4305f204-4203-ed11-82e6-000d3a81c2c0&keyword=
    return this.http.get<Array<categorys>>("~/api/customers/GetCategories");
  }
}
