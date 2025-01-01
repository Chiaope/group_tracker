import { Button, FlatList, View, Text, Modal, TouchableWithoutFeedback, StyleSheet, RefreshControl } from "react-native"
import ExpenseListItem, { ExpenseData } from "./ExpenseListItem"
import { useGetAllExpense } from "@/app/Services/ExpenseServices"
import { useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"

interface ExpenseDataList {
    expenseDataList: ExpenseData[]
}

export default function ExpensePage() {
    console.log("~~~~~ Expense Page ~~~~~")
    const [refreshing, setRefreshing] = useState(false);
    const [getAllExpense, loading, expenseDataList, error] = useGetAllExpense(refreshing)
    console.log('All Expense')
    console.log(expenseDataList)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllExpense()
    }, []);

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
                                <FlatList
                                    ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
                                    data={expenseDataList}
                                    renderItem={({ item }) => {
                                        return <ExpenseListItem expenseData={item} />
                                    }}
                                    refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
                                />
                            </View>
                        </View>
                )
            }
        </>
    )
}