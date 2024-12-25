import { Text, View } from "react-native";
import { Button } from '@react-navigation/elements';
import { useNavigation } from "@react-navigation/native";

export default function TodoPage() {
    const navigation = useNavigation<any>();
    
    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Button onPress={() => navigation.navigate('Home')}>
                    Go to Home
                </Button>
            </View>
        </>

    )
}