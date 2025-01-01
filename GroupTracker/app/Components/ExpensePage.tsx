import { Button, FlatList, View, Text, Modal, TouchableWithoutFeedback, StyleSheet } from "react-native"
import ExpenseListItem, { ExpenseData } from "./ExpenseListItem"
import { useGetAllExpense } from "@/app/Services/ExpenseServices"
import { useNavigation } from "@react-navigation/native"

interface ExpenseDataList {
    expenseDataList: ExpenseData[]
}

export default function ExpensePage() {
    console.log("~~~~~ Expense Page ~~~~~")

    const [getAllExpense, loading, expenseDataList, error] = useGetAllExpense()
    console.log('All Expense')
    console.log(expenseDataList)
    const navigation = useNavigation<any>();

    function addButtonPressed() {
        console.log('add button pressed')
        navigation.navigate('Expense Form')
    }

    let totalSpent = expenseDataList.reduce((accumulator, current) => accumulator + current.amount_cents, 0)
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
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "stretch",
                                    margin: 5,
                                    maxWidth: 500
                                }}>
                                <View style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    width: "100%",
                                    justifyContent: "space-between",
                                    padding: 10
                                }}>
                                    <Text style={{ alignContent: 'center' }}>Total Spent: ${totalSpent / 100}</Text>
                                    <Button title="Add" onPress={addButtonPressed} />
                                </View>
                                <FlatList ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
                                    data={expenseDataList}
                                    renderItem={({ item }) => {
                                        return <ExpenseListItem expenseData={item} />
                                    }}
                                />
                            </View>
                        </View>
                )
            }
        </>
    )
}