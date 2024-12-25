import { Button } from "@react-navigation/elements";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
    const navigation = useNavigation<any>();

    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Button onPress={() => navigation.navigate('Todo')}>
                    Go to To Do
                </Button>
            </View>
        </>
    );
}
