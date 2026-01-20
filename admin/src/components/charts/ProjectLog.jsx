import React, {useRef, useCallback, useEffect} from 'react';

import BarChart from "../ui/BarChart";
import { fetchProjectStats } from "../../redux/analyticSlice";

import { useSelector, useDispatch } from "react-redux";
import { toast } from 'sonner';

function ProjectLog() {
  const dispatch = useDispatch();
  const fetchLoginLogRef = useRef(false);

  const {underConstruction, completedProjects, totalProjects} = useSelector((state)=>(state.analyticReducer));

  const fetchLoginLog = useCallback(async ()=>{
    try {
      let data = null;
      if (completedProjects === null || totalProjects === null) {
        data = await dispatch(fetchProjectStats()).unwrap();
        // console.log("list logged users : ", data);
        if (data?.success) {
          toast.success(`${data?.message}`);
          return { success: true };
        };
        toast.error("Failed", {
          description: data?.message || "Something went wrong",
        });
      };
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
      chartId="chart2" 
      labels={["Total", "Completed", "Under Cons"]}
      values={[totalProjects, completedProjects, underConstruction]}
      label="Project Stats"
      backgroundColors={[
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(120, 139, 132, 0.7)",
        ]}
    />
  </>);
};

export default ProjectLog;