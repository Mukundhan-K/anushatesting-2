import React, { useEffect, useState, useCallback, useRef } from 'react';

// import ListProjects from "./ListProjects";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProjects } from "../../redux/adminSlice";
import UserLog from '../charts/userLog';
import ProjectLog from '../charts/ProjectLog';
import RoleLog from '../charts/RoleLog';

const DashBoard = () => {

  const navigate = useNavigate();

  const {userList:users} = useSelector((state)=>(state.adminUserReducer));
  const {productList:projList} = useSelector((state)=>(state.adminProductReducer));


  return (
    <div>
      <div className='py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

          <div className='border rounded-xl p-5 flex flex-col gap-4'>

            <RoleLog />
            <div>
              <button className="px-4 py-2 bg-a-green text-white rounded-xl"
                onClick={()=>navigate("/admin/listuser")}
              >
                View All
              </button>
            </div>
          </div>

          <div className='border rounded-xl p-5 flex flex-col justify-center gap-4'>
            
            <ProjectLog />

          </div>

          <div className='border rounded-xl p-5 flex flex-col justify-center gap-4'>
            
            <UserLog />
            <div>
              <button className="px-4 py-2 bg-a-green text-white rounded-xl"
                onClick={()=>navigate("/admin/loguser", { replace: true })}>
                View All
              </button>
            </div>

          </div>

          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;