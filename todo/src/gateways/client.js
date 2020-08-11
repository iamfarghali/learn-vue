import tasksApi from "@/gateways/tasksApi";
import loginApi from "@/gateways/loginApi";
import registerApi from "@/gateways/registerApi";

export default {
  tasks: tasksApi,
  login: loginApi,
  register: registerApi
};
