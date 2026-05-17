import "@/global.css";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import UserContextProvider from "@/Context/UserContextProvider";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light">
    <SafeAreaProvider>
    <UserContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(Pages)" />
        <Stack.Screen name="(HomeDrawer)" />
        <Stack.Screen name="index" />
      </Stack>
    </UserContextProvider>
    </SafeAreaProvider>
  </GluestackUIProvider>
}
