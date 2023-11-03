import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchAdminInviteToken } from "../hooks/reactQuery";
import AdminInviteLink from "../ui/roles/ui/AdminInviteLink";
import { useLocation } from "react-router";

function GetAdminInviteLink() {
  const location = useLocation();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const queryKey = ["admin-invite-token"];
  const { data } = useQuery(
    queryKey,
    () => {
      return fetchAdminInviteToken(token, location.pathname);
    },
    {
      staleTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: false,
    }
  );
  console.log(data);
  return <AdminInviteLink adminInviteLink={data} />;
}

export default GetAdminInviteLink;
