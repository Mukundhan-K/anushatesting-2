import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPerUserLoginLogs } from "../../redux/analyticSlice";
import { toast } from "sonner";

export default function AdminLogUsers() {

  const fetchedRef = useRef(false);
  const dispatch = useDispatch();
  const {logUserList:users} = useSelector((state)=>(state.analyticReducer));

  const fetchUsers = useCallback(async () => {
      try {
        let data = null;
        console.log("fetch users");
        
        if (!users?.length) {
          data = await dispatch(fetchPerUserLoginLogs()).unwrap();
        }
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
      }
    },
    [dispatch, users?.length]
  );
  
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchUsers();
  }, []);


  return (
    <div className="py-4 md:py-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex justify-between">
        User Login Management - 7 days
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">logins</th>
              <th className="p-3 text-center">lastLogin</th>
            </tr>
          </thead>

          <tbody>
            {users?.map(user => (
              <tr key={user?._id} className="border-t">
                <td className="p-3">{user?.email}</td>

                <td className="p-3 text-center">
                  {user?.logins}
                </td>
                
                <td className="p-3 text-center">
                  {user?.lastLogin && new Date(user?.lastLogin).toLocaleString()}
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

            <div>
              <p className="text-sm text-gray-500 mb-1">Logins : {user?.logins}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Last Login : {user?.lastLogin &&  new Date(user?.lastLogin).toLocaleString()}</p>
            </div>

           
          </div>
        ))}
      </div>
    </div>
  );
}
