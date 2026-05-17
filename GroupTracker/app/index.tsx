import "@/global.css";

import { UserContext } from "@/Context/UserContext";
import Auth from "./(Pages)/Auth";
import { useContext, useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { COLORS } from "@/Globals/GlobalConstants";

export default function Root() {
  const { user, loading } = useContext(UserContext)

  useEffect(() => {
    if (user?.id) {
      router.replace("/(HomeDrawer)/(ExpenseTab)/ExpensePage")
    }
  }, [user, loading])

  return <>
    {loading && <View style={{ padding: 25, position: 'absolute', top: 0, left: 0, right: 0 }}>
      <ActivityIndicator size="large" color={COLORS.SPINNER} />
    </View>}
    <Auth />
  </>

}
