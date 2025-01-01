import { useCallback, useEffect, useState } from "react"
import { supabase } from "../Utils/supabase";
import { ExpenseData } from "@/app/Components/ExpenseListItem";

function useGetAllExpense() {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const [allExpense, setAllExpense] = useState<ExpenseData[]>([])

    const getAllExpense = useCallback(async function () {
        console.log('Get all expense')
        try {
            const allExpense = await supabase.from('expense_item_t').select()
            if (allExpense.error) {
                throw allExpense.error
            }
            setAllExpense(allExpense.data)
        } catch (error: any) {
            console.log('this is error')
            setError(error)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        getAllExpense()
    }, [])
    return [getAllExpense, loading, allExpense, error] as const
}

function useAddExpense() {
    const [loading, setLoading] = useState(true)
    const [inserted, setInserted] = useState(false)
    const [error, setError] = useState(null)

    const addExpense = useCallback(async function (expenseData: ExpenseData) {
        console.log('Add expense')
        console.log(expenseData)
        try {
            const { data, error } = await supabase
                .from('expense_item_t')
                .insert({ ...expenseData, group: 1 }).select()
            console.log(data)
            if (error) {
                throw error
            } else {
                setInserted(true)
            }
        } catch (error: any) {
            console.log('this is error')
            setError(error)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }, [])
    return [addExpense, loading, inserted, error] as const
}

export { useGetAllExpense, useAddExpense }