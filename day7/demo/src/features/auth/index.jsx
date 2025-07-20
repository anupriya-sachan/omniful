import { useForm } from "react-hook-form";
import { setLoginValue } from "./authSlice";
import { useDispatch } from "react-redux";

const LogIn = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const submitValues = (data) => {
        dispatch(setLoginValue(data));
        console.log(data);
        
    } 
    return(
        <>
        <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-gray-900 font-bold text-3xl mb-1">Login</h1>
                <p className="text-gray-600 text-sm mb-6">Hi, welcome back!</p>

                <form onSubmit={handleSubmit(submitValues)}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="username" className="text-gray-700 text-sm font-medium mb-1">Username</label>
                    <input
                    {...register("username", {
                        required: true,
                        validate: {
                        minLength: (v) => v.length > 3,
                        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v),
                        },
                    })}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm"
                    type="text"
                    id="username"
                    placeholder="Enter username..."
                    />
                    <div className="text-red-500 text-xs mt-1">
                    {errors.username?.type === "required" && <p>Username is required.</p>}
                    {errors.username?.type === "minLength" && <p>Username should be longer than 3 characters.</p>}
                    {errors.username?.type === "matchPattern" && <p>Only letters, numbers, and _ allowed.</p>}
                    </div>
                </div>

                <div className="flex flex-col mb-6">
                    <label htmlFor="role" className="text-gray-700 text-sm font-medium mb-1">Select Role</label>
                    <select
                    id="role"
                    required
                    defaultValue={"admin"}
                    {...register("role")}
                    className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 rounded-md text-sm"
                    >
                    <option value="admin">Admin</option>
                    <option value="manager">Sales Manager</option>
                    <option value="rep">Sales Rep</option>
                    <option value="view">Viewer</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-4 rounded-lg shadow-sm text-sm"
                >
                    Log In
                </button>
                </form>
            </div>
        </div>
    </>
    )
}

export default LogIn;