export namespace Constants {

    export const IS_DEBUG_MODE = false;
    export const IS_NATIVE: boolean = true;
    export const IS_BUILD_ANDROID:boolean=false;

   //const  TEST_HOST:string="http://192.168.2.224:6201";//test
    const  OFFICE_HOST:string="https://www.casheasy.cn";//office
      const  TEST_HOST:string="http://192.168.2.145:6100";//test

    export const HOST: string = Constants.IS_DEBUG_MODE?TEST_HOST:OFFICE_HOST;

    export const SORT_DESC = "DESC";
    export const SORT_ASC = "ASC";
    export const PAGE_SIZE = 10;
    export const PAGE_INDEX = 0;
    export const MSG_LOADING = "<div><p><ion-spinner icon='ios-small'></ion-spinner></p>请稍候<div>";

}
