import "@/global.css";

import UserContextProvider from "./Context/UserContext";
import Home from "./Pages/Home";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light">
    <UserContextProvider>
      <Home />
    </UserContextProvider>
  </GluestackUIProvider>

}
