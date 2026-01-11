import React, {useRef, useCallback, useEffect} from 'react';

import BarChart from "../ui/BarChart";
import { fetchLoginLogs } from "../../redux/analyticSlice";

import { useSelector, useDispatch } from "react-redux";
import { toast } from 'sonner';

function UserLog() {
  const dispatch = useDispatch();
  const fetchLoginLogRef = useRef(false);

  const {uniqueUserCount,totalLogins} = useSelector((state)=>(state.analyticReducer));

  const fetchLoginLog = useCallback(async ()=>{
    try {
      const data = await dispatch(fetchLoginLogs()).unwrap();
      // console.log("list logged users : ", data);
      if (data?.success) {
        toast.success(`${data?.message}`);
        return { success: true };
      };
      toast.error("Failed", {
        description: data?.message || "Something went wrong",
      });
      return { success: false };
      
    } catch (error) {
        console.error(error.message);
        toast.error("Failed", {
            description: error?.message || "Network error",
        });
        return { success: false };
    };
  }, [dispatch]);
  // }, [dispatch, prodList?.length]);

  useEffect(() => {
    if (fetchLoginLogRef.current) return;
    fetchLoginLogRef.current = true;
    fetchLoginLog();
  }, []);



  return (<>
    <BarChart
        labels={["Total Logins", "Unique Users"]}
        values={[totalLogins, uniqueUserCount]}
        label="Login Stats"
        backgroundColors={[
            "rgba(75, 192, 192, 0.7)",
            "rgba(255, 99, 132, 0.7)",
          ]}    />
  </>);
};

export default UserLog;