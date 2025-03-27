import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import {connect, io} from "socket.io-client";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp:false,
  isLoginIn:false,
  isUpdatingProfile:false,
  isCheckingAuth: true,
    onlineUsers : [],
    socket: null,

  checkAuth: async() =>{
    try {
        const res = await axiosInstance.get("/auth/check")
        set({authUser:res.data})
        get().connectSocket()
    } catch (error) {
        console.error("checkAuth error:", error.message);
        set({authUser:null})
    } finally{
        set({isCheckingAuth:false})
    }
  },
  signup:async(formData) => {
      set({isSigningUp:true})
      try {
          const res = await axiosInstance.post("/auth/signup", formData)
          set({authUser:res.data})
          toast.success("Account signup successfully")
      }catch (error) {
          console.error("signup error:", error.response?.data?.message || error.message);
          toast.error(error.response?.data?.message || "Signup failed");
      }finally{
          set({isSigningUp:false})
      }

  },
    logout:async() => {
      try {
          await axiosInstance.post("/auth/logout")
          set({authUser:null})
          toast.success("Logout successfully")
          get().disconnectSocket()
      }catch (error) {
          console.error("logout error:", error.response?.data?.message || error.message);
          toast.error(error.response?.data?.message || "logout failed");
      }

    },
    login:async(formData) => {
        set({isLoginIn:true})
        try {
            const res = await axiosInstance.post("/auth/login", formData)
            set({authUser:res.data})
            toast.success("Account login successfully")
            get().connectSocket()
        }catch (error) {
            console.error("login error:", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "login failed");
        }finally{
            set({isLoginIn:false})
        }

    },
    updateProfile:async(formData) => {
      set({isUpdatingProfile:true})
        try {
          const res= await axiosInstance.put("/auth/update-profile", formData)
            set({authUser:res.data})
            toast.success("Profile successfully")

        }catch (error) {
          console.error("updateProfile error:", error.response?.data?.message || error.message);
          toast.error(error.response?.data?.message || "updateProfile failed");

        }finally {
          set({isUpdatingProfile:false})

        }

    },
    connectSocket:() => {
      const {authUser} = get()
        if (!authUser || get().socket?.connected) return
      const socket = io(BASE_URL, {
          query:{
              userId: authUser._id
          }
      })
        socket.connect()

        set({socket:socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})

        })

    },
    disconnectSocket:() => {
      if(get().socket?.connected) get().socket?.disconnect();

    }



}))