import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userProcessChannelBroadcast,
  userStartBroadcastChannel,
} from "../../reducers/userAuthReducer";
import { logout } from "../../contexts/redux/actions/userActions";
import { useQueryClient } from "@tanstack/react-query";

function AuthBroadcast({ children }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const tokenFromRedux =
    useSelector((state) => state?.userAuth?.userInfo?.token) || null;

  useEffect(() => {
    const processBroadcastMessage = (userInfoFromStorage) => {
      try {
        dispatch(userStartBroadcastChannel());

        dispatch(userProcessChannelBroadcast(userInfoFromStorage));
      } catch (error) {
        dispatch(logout());
      }
    };

    // Set up the Broadcast Channel listener to receive messages from other tabs

    const broadcastChannel = new BroadcastChannel("authChannel");
    broadcastChannel.onmessage = function (event) {
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
      const { token = null } = userInfoFromStorage;

      if (event.data.type === "AUTH_SUCCESS") {
        // Handle the message and update the state from local storage
        // Dispatch actions to update the Redux state with the JWT token and auth details
        if (token == tokenFromRedux) {
          return;
        }
        processBroadcastMessage(userInfoFromStorage);

        // Mark that the broadcast channel was created by another tab
      }
      if (event.data.type === "AUTH_LOGOUT") {
        queryClient.clear();
        if (tokenFromRedux === null && token === null) {
          return;
        }
        dispatch(logout());
      }
    };
    // Clean up the Broadcast Channel listener when the component unmounts
    return () => {
      broadcastChannel.close();
    };
  }, [dispatch, tokenFromRedux, queryClient]);

  return <>{children}</>;
}

export default AuthBroadcast;
