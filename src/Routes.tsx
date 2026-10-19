import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Loadable from "@/ui-component/Loadable";
import MainLayout from "./layout/main";
import SsoCallback from "@/pages/SsoCallback";
import UserProfile from "./pages/Profile";
import SubscriptionPage from "./pages/Subscription.";
import CheckoutPage from "./pages/Checkout";

const PagesLanding = Loadable(lazy(() => import("@/pages")));
const QRList = Loadable(lazy(() => import("@/pages/QRList")));
const CheckoutResultPage = Loadable(lazy(() => import("@/pages/CheckoutResult")));
// const ErrorPage = Loadable(lazy(() => import("@/pages/landing/maintenance/Error")));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<PagesLanding />} />
      <Route path="list-qr" element={<QRList />} />
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="subcription" element={<SubscriptionPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="checkout/result" element={<CheckoutResultPage />} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Route>
    <Route path="/sso-callback" element={<SsoCallback />} />
  </Routes>
);

export default AppRoutes;
