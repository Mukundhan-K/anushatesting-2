import { useEffect, useState, useCallback, useRef } from "react";
import {getImageSvg} from "../../utility/getImage"
import { useDispatch, useSelector } from "react-redux";

import { fetchAllUsers, changeRole, verifyUser, deleteUser, deleteUnverifiedUser } from "../../redux/adminuserSlice";
import { toast } from "sonner";

export default function AdminUsers({setViewAdminUsers}) {
  // const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  const dispatch = useDispatch();
  const {userList:users} = useSelector((state)=>(state.adminUserReducer));

  const fetchUsers = useCallback(async () => {
      try {
        let data = null;
        console.log("fetch users");
        
        if (!users?.length) {
          setLoading(true);
          data = await dispatch(fetchAllUsers()).unwrap();
        }
        if (data?.success) {
          setLoading(false);
          toast.success(`${data ?.message}`);
          return { success: true };
        };
        setLoading(false);
        toast.error("Failed", {
          description: data?.message || "Something went wrong",
        });
        return { success: false };
      } catch (error) {
        setLoading(false);
        console.error(error.message);
        toast.error("Failed", {
            description: error?.message || "Network error",
        });
        return { success: false };
      }
    },
    [dispatch, users?.length]
  );
  
  const changeUserRole = async (id, role)=>{
    try {
      const data = await dispatch(changeRole({id,role})).unwrap();
      console.log("list all projs : ", data);
      if (data?.success) {
        toast.success(`${data ?.message}`);
        dispatch(fetchAllUsers()).unwrap()
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
  };
  
  const userVerification = async (id)=>{
    try {
      const data = await dispatch(verifyUser(id)).unwrap();
      console.log("list all projs : ", data);

      if (data?.success) {
        toast.success(`${data ?.message}`);
        dispatch(fetchAllUsers()).unwrap()
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
  };
  
  const userDelete = async (id)=>{
    try {
      const confirmed = window.confirm(
        'Are you sure you delete?'
      );
      if (!confirmed) return;

      const data = await dispatch(deleteUser(id)).unwrap();
      console.log("list all projs : ", data);

      if (data?.success) {
        toast.success(`${data ?.message}`);
        dispatch(fetchAllUsers()).unwrap()
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
  };
  
  const unverifiedUserDelete = async (id)=>{
    try {
      const confirmed = window.confirm(
        'Are you sure you delete unverified Users?'
      );
      if (!confirmed) return;

      const data = await dispatch(deleteUnverifiedUser()).unwrap();
      console.log("list all projs : ", data);

      if (data?.success) {
        toast.success(`${data ?.message}`);
        dispatch(fetchAllUsers()).unwrap()
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
  };


  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchUsers();
  }, []);

  if (loading) return <p className="p-4">Loading users…</p>;

  return (
    <div className="py-4 md:py-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex justify-between">
        User Management

        <div className="flex gap-5">
          <button
            className="px-4 py-1 bg-red-600 text-base! text-white rounded-lg"
            onClick={unverifiedUserDelete}
            >
            Delete unverified Users
          </button>

          <button onClick={()=>setViewAdminUsers(()=>false)}>
              <img src={getImageSvg("cancel")} className='size-7' loading='lazy' alt={`cancel icon`} title={`cancel icon`}  />
          </button>
        </div>
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Verified</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map(user => (
              <tr key={user?._id} className="border-t">
                <td className="p-3">{user?.email}</td>

                <td className="p-3 text-center">
                  {user?.isVerified ? "✅" : "❌"}
                </td>

                <td className="p-3 text-center">
                  <select
                    value={user?.role}
                    onChange={(e) => {
                        const newRole = e.target.value;
                        const confirmed = window.confirm(
                          `Are you sure you want to change ${user.userName}'s role to "${newRole}"?`
                        );
                        if (!confirmed) return;
                        changeUserRole(user?._id, newRole);
                      }
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-3 text-center">

                    <div className="flex justify-center gap-2">
                        {(!user?.isVerified) && <button
                            onClick={() => userVerification(user?._id)}
                            className="px-4 py-2 bg-a-green text-white rounded-lg hover:bg-green-700"
                        >
                            Verify
                        </button>}

                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            onClick={()=>userDelete(user?._id)}
                            >
                            Delete
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {users?.map(user => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium break-all">{user?.email}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Verified</span>
              <span>{user?.isVerified ? "✅" : "❌"}</span>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <select
                value={user?.role}
                onChange={(e) => {
                    const newRole = e.target.value;
                    const confirmed = window.confirm(
                      `Are you sure you want to change ${user.userName}'s role to "${newRole}"?`
                    );
                    if (!confirmed) return;
                    changeUserRole(user?._id, newRole);
                  }
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* {!user.isVerified && ( */}

            <div className="flex gap-2">
              {(!user?.isVerified) && <button
                  onClick={() => userVerification(user?._id)}
                  className="px-4 py-2 bg-a-green text-white rounded-lg hover:bg-green-700"
              >
                  Verify
              </button>}

              <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={()=>userDelete(user?._id)}
                  >
                  Delete
              </button>
            </div>
            {/* )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
