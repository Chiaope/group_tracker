import { Button, FlatList, View, Text } from "react-native"
import ExpenseListItem, { ExpenseData } from "./ExpenseListItem"

interface ExpenseDataList {
    expenseDataList: ExpenseData[]
}

export default function ExpensePage({expenseDataList}: ExpenseDataList) {
    console.log("~~~~~ Expense Page ~~~~~")
    console.log(expenseDataList)

    let totalSpent = expenseDataList.reduce((accumulator, current) => accumulator + current.amount_cents, 0)
    return (
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
                <Text>Total Spent: ${totalSpent/100}</Text>
                <Button title="Minus" />
            </View>
            <FlatList ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
                data={expenseDataList}
                renderItem={({ item }) => {
                    return <ExpenseListItem expenseData={item} />
                }}
            />
        </View>
    )
}