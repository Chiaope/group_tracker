import { Button, FlatList, View, Text, RefreshControl } from "react-native"
import ScheduledExpenseListItem from "../Components/ScheduledExpenseListItem"
import { useDeleteScheduledExpense, useGetAllScheduledExpense } from "@/app/Services/ExpenseServices"
import { useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { useShowToast } from "../Components/CustomToast"

export default function ScheduledExpensePage() {
    console.log("~~~~~ Scheduled Expense Page ~~~~~")
    const getAllScheduledExpenseService = useGetAllScheduledExpense()
    const deleteScheduledExpenseService = useDeleteScheduledExpense()
    const toast = useShowToast()
    const [addedScheduledExpense, setAddedScheduledExpense] = useState(false)

    const group_input = 1
    let monthlyRecurringExpense = getAllScheduledExpenseService.allScheduledExpense.reduce((accumulator, current) => accumulator + current.amount_cents, 0)

    useEffect(() => {
        getAllScheduledExpenseService.getAllScheduledExpense(group_input)
    }, [deleteScheduledExpenseService.scheduledExpenseDeleted, addedScheduledExpense])


    useEffect(() => {
        if (!deleteScheduledExpenseService.loading) {
            console.log('Delete scheduled expense loading')
            if (deleteScheduledExpenseService.error) {
                console.log(deleteScheduledExpenseService.error)
                toast.showToast("error", "Failed to delete scheduled expense.")
            } else {
                if (deleteScheduledExpenseService.scheduledExpenseDeleted) {
                    console.log('Deleted scheduled expense successfully')
                    toast.showToast("success", "Successfully deleted scheduled expense.")
                }
            }
        }
    }, [deleteScheduledExpenseService.loading, deleteScheduledExpenseService.scheduledExpenseDeleted, deleteScheduledExpenseService.error])

    const onRefresh = useCallback(() => {
        getAllScheduledExpenseService.getAllScheduledExpense(group_input)
    }, []);


    const deleteScheduledExpenseFunction = useCallback(async (id: number) => {
        await deleteScheduledExpenseService.deleteScheduledExpense(id)
    }, []);


    const navigation = useNavigation<any>();

    function addButtonPressed() {
        console.log('add button pressed')
        setAddedScheduledExpense(false)
        navigation.navigate('Schedule Expense Form', {'addedScheduledExpense': setAddedScheduledExpense})
    }


    if (getAllScheduledExpenseService.error) {
        console.log('Error getting all scheduled expense:')
        console.log(getAllScheduledExpenseService.error)
    }

    return (
        <>
            {getAllScheduledExpenseService.loading ? <View>
                <Text>Loading</Text>
            </View> :
                (
                    getAllScheduledExpenseService.error ?
                        <Text>{getAllScheduledExpenseService.error.error.message}</Text> :
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
                                    <Text style={{ flex: 1, textAlignVertical: 'center' }}>Monthly Recurring Expense: ${monthlyRecurringExpense / 100}</Text>
                                    <View style={{ alignContent: 'center', alignItems: "flex-end" }}>
                                        <Button title="Add" onPress={addButtonPressed} />
                                    </View>
                                </View>
                                <FlatList
                                    ItemSeparatorComponent={() => <View style={{ marginBottom: 5 }} />}
                                    data={getAllScheduledExpenseService.allScheduledExpense}
                                    renderItem={({ item }) => {
                                        return <ScheduledExpenseListItem scheduledExpenseData={item} deleteFunction={deleteScheduledExpenseFunction} />
                                    }}
                                    refreshControl={<RefreshControl refreshing={getAllScheduledExpenseService.loading || deleteScheduledExpenseService.loading} onRefresh={onRefresh} />}
                                />
                            </View>
                        </View>
                )
            }
        </>
    )
}