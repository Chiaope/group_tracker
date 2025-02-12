import "@/global.css";

import UserContextProvider from "./Context/UserContext";
import Home from "./Pages/Home";

export default function RootLayout() {
  return <UserContextProvider>
    <Home />
  </UserContextProvider>
}
