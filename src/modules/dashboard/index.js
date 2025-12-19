import DashboardRoutes from "./DashboardRoutes";
import router from "@/router";
export default {
    install(){
        router.addRoute(DashboardRoutes)
    }
}