import { Text, View } from "react-native";
import { useGetAllExpense } from "../Services/ExpenseServices";
import ExpensePage from "@/Components/ExpensePage";

export default function Expense() {
    const [loading, allExpense, error] = useGetAllExpense()

    return (
        <>
            {loading ? <View>
                <Text>Loading</Text>
            </View> :
                (
                    error ?
                        <Text>{error.message}</Text> :
                        <View style={{ 
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: "center",
                         }}>
                            <ExpensePage expenseDataList={allExpense.data} />
                         </View>
                )
            }
        </>

    )
}