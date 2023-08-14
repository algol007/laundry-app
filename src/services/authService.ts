import { GeneralResponse } from "@/utils/generalResponse";
import { httpClient } from "../libs/httpClient";

interface LoginResult extends GeneralResponse {
  response: string
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  phone: string;
  image_url: string;
}

const authService = {
  login(payload: LoginPayload): Promise<LoginResult> {
    return httpClient.post('/user/sign-in', payload);
  },
  register(payload: RegisterPayload): Promise<LoginResult> {
    return httpClient.post('/user/sign-up', payload);
  },
}

export default authService;