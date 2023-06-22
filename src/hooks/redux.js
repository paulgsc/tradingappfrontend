import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { accessAdminView } from "../contexts/redux/actions/userActions";

export function generateAdminHas() {
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(accessAdminView())
    }, []);
  
  }