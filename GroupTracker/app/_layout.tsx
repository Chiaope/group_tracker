import "@/global.css";

import { Stack } from "expo-router";
import UserContextProvider from "./Context/UserContext";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light">
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(Pages)" />
        <Stack.Screen name="(HomeDrawer)" />
        <Stack.Screen name="index" />
      </Stack>
    </UserContextProvider>
  </GluestackUIProvider>
}
