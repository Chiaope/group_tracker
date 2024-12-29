import { FlatList, Text, View } from "react-native";
import ExpenseListItem from "@/Components/ExpenseListItem";
import { useGetAllExpense } from "../Services/ExpenseServices";

export default function ExpensePage() {
    const [loading, allExpense] = useGetAllExpense()
    console.log("~~~~~ Expense Page ~~~~~")

    return (
        <>
            {loading ? <View>
                <Text>Loading</Text>
            </View> :
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <FlatList
                        data={allExpense.data}
                        renderItem={({ item }) => {
                            return (<>
                                <ExpenseListItem expenseData={item}>
                                </ExpenseListItem>
                            </>)
                        }}
                    />
                </View>
            }
        </>

    )
}