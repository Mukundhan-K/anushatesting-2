import React from 'react';

import ListProjects from "./ListProjects";
import { useEffect, useState } from 'react';
import AdminUsers from './AdminUsers';
import { useSelector } from "react-redux";

const DashBoard = () => {

  const [viewAdminUsers, setViewAdminUsers] = useState(false);
  const {userList:users} = useSelector((state)=>(state.adminUserReducer));
  const {productList:projList} = useSelector((state)=>(state.adminProductReducer));   

  return (
    <div>
      {viewAdminUsers ? <>
          <AdminUsers setViewAdminUsers={setViewAdminUsers}  />
        </> : <>
          <div className='py-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='border rounded-xl p-5 flex flex-col gap-4'>

                <div>Total Users : {users?.length}
                </div>

                <div> Admins :{
                  users?.filter(
                    (user) => user?.role === "admin"
                  )?.length}
                </div>

                <div> Editors :{
                  users?.filter(
                    (user) => user?.role === "editor"
                  )?.length}
                </div>

                <div>Verified Users : {
                  users?.filter(
                    (user) => user?.isVerified
                  )?.length}
                </div>

                <div>Unverified Users : {
                  users?.filter(
                    (user) => !user?.isVerified
                  )?.length}
                </div>

                <div>
                  <button className="px-4 py-2 bg-a-green text-white rounded-xl"
                    onClick={()=>setViewAdminUsers(()=>true)}
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className='border rounded-xl p-5 flex flex-col justify-center gap-4'>

                <div>Total Projects : {projList?.length}
                </div>

                <div>Completed Projects : {
                  projList?.filter(
                    (proj) => proj?.status === "completed"
                  )?.length}
                </div>

                <div>Under Contruction : {
                  projList?.filter(
                    (proj) => proj?.status === "under construction"
                  )?.length}
                </div>

              </div>

              {/* <div></div> */}
            </div>
          </div>
        </>
      }
      
      <ListProjects />
    </div>
  );
};

export default DashBoard;