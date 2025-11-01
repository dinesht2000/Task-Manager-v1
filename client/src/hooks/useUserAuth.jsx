import { useContext,useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/usersContext";

export const useUserAuth=()=>{
    const {user,loading,clearUser}=useContext(UserContext);
    const navigate=useNavigate();

    useEffect(()=>{ 
        if(loading) return;
        if(user) return;

        if(!user){
            clearUser();
            navigate("/login");
        }
    },[user,loading,clearUser,navigate]);
}