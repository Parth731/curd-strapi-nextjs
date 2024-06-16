import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

//   axiosInstance.interceptors.request.use(async(config) => {
//   //   if (config.url !== "/cms-authenticate") {
//       const jwt = await getAccessToken();
//       if (jwt) {
//         config.headers.Authorization = `Bearer ${jwt}`;
//       }
//     // }
//     return config;
//   });

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // const authToken = getCookie(AUTHENTICATION_TOKEN) || "";
      //   const tempUserData = jwt_decode(authToken) || ({} as any);
      //     // Router.push(apiendpoints.logOutUser(tempUserData?.sub))
      //     if(tempUserData?.sub)
      //     {
      //       apiendpoints.logOutUser(tempUserData?.sub);
      //     }
      //     Router.push(apiendpoints.signoutFromSSO())
    }
    if (!error.response)
      // if (!navigator.onLine) {
      //   // toast.error("You are currently offline", {
      //   //   position: toast.POSITION.BOTTOM_RIGHT,
      //   // });
      //   return Promise.reject(error);
      // } else {
      //   // toast.error("APIs not working at the moment. Pleas try again later.", {
      //   //   position: toast.POSITION.BOTTOM_RIGHT,
      //   // });
      //   return Promise.reject(error);
      // }
      return Promise.reject(error);
  }
);

export default axiosInstance;
