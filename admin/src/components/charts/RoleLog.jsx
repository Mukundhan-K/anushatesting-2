import React, {useRef, useCallback, useEffect} from 'react';

import LineChart from "../ui/LineChart";
import { fetchUSerStats } from "../../redux/analyticSlice";

import { useSelector, useDispatch } from "react-redux";
import { toast } from 'sonner';

function RoleLog() {
  const dispatch = useDispatch();
  const fetchLoginLogRef = useRef(false);

  const {totalUsers, adminsNo, normalUsers, editorUsers, verifiedUsers, unverifiedUsers} = useSelector((state)=>(state.analyticReducer));

  const fetchLoginLog = useCallback(async ()=>{
    try {
      const data = await dispatch(fetchUSerStats()).unwrap();
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
    <LineChart
        labels={["Total", "Admins", "Editor", "Normal" , "Verified", "Unverified"]}
        values={[totalUsers, adminsNo, editorUsers, normalUsers, verifiedUsers, unverifiedUsers]}
        label="User Stats"
        borderColor="#6366F1"
        pointColor="#ffffff"
    />
  </>);
};

export default RoleLog;