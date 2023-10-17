import api from "../http/api";
import { apiUrlLogin } from "../http/apiUrl";

export type Inputslogin = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: Inputslogin) => {
  const res = await api.post(apiUrlLogin, {
    email,
    password,
  });

  if (res.status === 200) {
    localStorage.setItem("token", res.data.token);
    return true;
  }

  return false;
};
