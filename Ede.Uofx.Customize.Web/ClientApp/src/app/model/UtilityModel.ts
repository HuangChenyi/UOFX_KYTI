export interface custInfo {
  companyName: string;
  address: string;
  phoneNumber: string;
  category:string;
  product:string;
  gridData:Array<customer>;
}

export interface categorys {
  categoryID: number;
  categoryName: string;
}

export interface products {
  productID: string;
  productName: string;
}

export interface custInfos{
address: string;
phoneNumber: string;
companyName: string;
}

export interface customer
{
  address: string;
  phone:string;
  companyName:string;
  no:number
}
