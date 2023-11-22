import React from "react";
import Branch from "../Pages/Branch";
import Signup from "../Pages/Signup";
import CompanyAdd from "../Pages/CompanyAdd";

const CommonRoutes = [
  { path: "/", element: <Branch /> },
  { path: "/signup/:branch", element: <Signup /> },
  { path: "/signup/companyDet", element: <CompanyAdd /> },
];
const BuyerRoutes = [{ path: "/", element: "" }];
const BuyingRoutes = [{ path: "/", element: "" }];
const FactoryRoutes = [{ path: "/", element: "" }];
const QCRoutes = [{ path: "/", element: "" }];

const CheckRoutes = (role) => {
  if (role === "Buyer") {
    return BuyerRoutes;
  } else if (role === "Buying Agency") {
    return BuyingRoutes;
  } else if (role === "Factory") {
    return FactoryRoutes;
  } else if (role === "QC Agency") {
    return QCRoutes;
  }
};

const routes = (role, isSignedIn) => {
  const SignedInList = CheckRoutes(role);

  return isSignedIn ? [...SignedInList, ...CommonRoutes] : [...CommonRoutes];
};

export default routes;
