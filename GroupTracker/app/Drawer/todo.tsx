import { FlatList, Text, View, StyleSheet } from "react-native";
import ToDoListItem from "@/Components/ToDoListItem";

export default function TodoPage() {
    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                {/* <Button onPress={() => navigation.navigate('Home')}>
                    Go to Home
                </Button> */}
                <FlatList
                    data={[
                        'Devin',
                        'Dan',
                        'Dominic',
                        'Jackson',
                        'James',
                        'Joel',
                        'John',
                        'Jillian',
                        'Jimmy',
                        'Julie',
                    ]}
                    renderItem={({ item }) => {
                        const buttonProps = {
                            title: item
                        }
                        return (<>
                        <ToDoListItem buttonProps={buttonProps}>
                            <Text>Hello</Text>
                        </ToDoListItem>
                        </>)
                    }}
                />
            </View>
        </>

    )
}