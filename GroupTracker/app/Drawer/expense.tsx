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
                        <ExpensePage expenseDataList={allExpense.data} />
                )
            }
        </>

    )
}