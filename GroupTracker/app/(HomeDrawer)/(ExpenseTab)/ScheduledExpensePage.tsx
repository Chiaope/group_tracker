import { Button, FlatList, View, Text, RefreshControl } from "react-native"
import { useDeleteScheduledExpense, useGetAllScheduledExpense } from "@/app/Services/ExpenseServices"
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "@/app/Context/UserContext"
import { useShowToast } from "@/app/Components/CustomToast"
import ScheduledExpenseListItem from "@/app/Components/ScheduledExpenseListItem"
import { router, useFocusEffect } from "expo-router"

export default function ScheduledExpensePage() {
    console.log("~~~~~ Scheduled Expense Page ~~~~~")
    const { user } = useContext(UserContext)
    const getAllScheduledExpenseService = useGetAllScheduledExpense()
    const deleteScheduledExpenseService = useDeleteScheduledExpense()
    const toast = useShowToast()
    const [addedScheduledExpense, setAddedScheduledExpense] = useState(false)

    let monthlyRecurringExpense = getAllScheduledExpenseService.allScheduledExpense.reduce((accumulator, current) => accumulator + current.amount_cents, 0)

    useFocusEffect(useCallback(() => {
        getAllScheduledExpenseService.getAllScheduledExpense(user.selectedGroup)
    }, []))

    useEffect(() => {
        getAllScheduledExpenseService.getAllScheduledExpense(user.selectedGroup)
    }, [deleteScheduledExpenseService.scheduledExpenseDeleted, addedScheduledExpense, user.selectedGroup])


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
        getAllScheduledExpenseService.getAllScheduledExpense(user.selectedGroup)
    }, []);


    const deleteScheduledExpenseFunction = useCallback(async (id: number) => {
        await deleteScheduledExpenseService.deleteScheduledExpense(id)
    }, []);

    function addButtonPressed() {
        console.log('add button pressed')
        setAddedScheduledExpense(false)
        router.navigate("/(Pages)/ScheduleExpenseForm")
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