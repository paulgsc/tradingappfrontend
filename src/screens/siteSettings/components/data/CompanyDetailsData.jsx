import { useQueryClient } from "@tanstack/react-query";
import CompanyDetailsCard from "../ui/CompanyDetailsCard";

function CompanyDetailsData() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["site-settings"]);
  const companyDetails = [
    {
      id: 1,
      title: "Company name",
      content:
        userData?.first_name?.value &&
        `${userData?.first_name?.value} ${userData?.last_name?.value}`,
    },
    {
      id: 2,
      title: "Company website",
      content: userData?.email?.value,
    },
    {
      id: 3,
      title: "Company Phone Number",
      content: userData?.phone_number?.value,
    },

    {
      id: 4,
      title: "Company type",
      content: userData?.address?.value,
    },
  ];
  return <CompanyDetailsCard companyDetails={companyDetails} />;
}

export default CompanyDetailsData;
