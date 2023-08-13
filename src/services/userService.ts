import { GeneralResponse } from "@/utils/generalResponse";
import { httpClient } from "../libs/httpClient";

interface GetUserInfoResult extends GeneralResponse {
  response: {
    id: number;
    name: string;
  }  
}

const userService = {
  getUserInfo(): Promise<GetUserInfoResult> {
    return httpClient.get('/user/info');
  },
}

export default userService;