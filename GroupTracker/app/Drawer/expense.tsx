import { Button, FlatList, Text, View } from "react-native";
import ExpenseListItem from "@/Components/ExpenseListItem";
import { useGetAllExpense } from "../Services/ExpenseServices";

export default function ExpensePage() {
    const [loading, allExpense, error] = useGetAllExpense()
    console.log("~~~~~ Expense Page ~~~~~")

    return (
        <>
            {loading ? <View>
                <Text>Loading</Text>
            </View> :
                (
                    error ? <Text>{error.message}</Text> :
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "stretch",
                                margin: 5
                            }}>
                            <View style={{
                                flexDirection: "row",
                                gap: 5,
                                width: "100%",
                                justifyContent: "space-around",
                                margin: 5
                            }}>
                                <Button title="Add" />
                                <Button title="Minus" />
                            </View>
                            <FlatList ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
                                data={allExpense.data}
                                renderItem={({ item }) => {
                                    return <ExpenseListItem expenseData={item} />
                                }}
                            />
                        </View>
                )
            }
        </>

    )
}