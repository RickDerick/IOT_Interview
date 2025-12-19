import DashboardLayout from "@/layouts/DashboardLayout.vue";
import OverviewPage from "../overview/views/OverviewPage.vue";

export default {
  path: "/",
  component: DashboardLayout,
  children: [
    {
      path: "",
      redirect: "/overview",
    },
    {
      path: "overview",
      name: "overview",
      component: OverviewPage,
    },
  ],
};