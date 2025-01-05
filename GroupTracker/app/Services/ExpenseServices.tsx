import { useCallback, useEffect, useState } from "react"
import { supabase } from "../Utils/supabase";
import { ExpenseData } from "@/app/Components/ExpenseListItem";

const expenseTable = process.env.EXPO_PUBLIC_EXPENSE_TABLE_KEY || ""

function useGetAllExpense({ refresh }: any) {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [allExpense, setAllExpense] = useState<ExpenseData[]>([])

    const getAllExpense = useCallback(async function () {
        console.log('Get all expense')
        try {
            setLoading(true)
            const allExpenseResponse = await supabase.from(expenseTable).select().order('created_at', { ascending: false })
            if (allExpenseResponse.error) {
                console.log('Add expense error:')
                console.log(allExpenseResponse.error.message)
                console.log(allExpenseResponse.status)
                console.log(allExpenseResponse.statusText)
                setError(
                    {
                        "error": allExpenseResponse.error,
                        "status": allExpenseResponse.status,
                        "statusText": allExpenseResponse.statusText
                    }
                )
                throw allExpenseResponse.error
            }
            setAllExpense(allExpenseResponse.data)
        } catch (error: any) {} finally {
            setLoading(false)
        }
    }, [refresh])
    useEffect(() => {
        getAllExpense()
    }, [])
    return [getAllExpense, loading, allExpense, error] as const
}

function useAddExpense() {
    const [loading, setLoading] = useState<any>(false)
    const [inserted, setInserted] = useState(false)
    const [error, setError] = useState<any>(null)

    const addExpense = useCallback(async function (expenseData: ExpenseData) {
        console.log('Add expense')
        console.log(expenseData)
        try {
            setLoading(true)
            const addExpenseResponse = await supabase
                .from(expenseTable)
                .insert({ ...expenseData, group: 1 })
                .select()
            console.log(addExpenseResponse.data)
            if (addExpenseResponse.error) {
                console.log('Add expense error:')
                console.log(addExpenseResponse.error.message)
                console.log(addExpenseResponse.status)
                console.log(addExpenseResponse.statusText)
                setError(
                    {
                        "error": addExpenseResponse.error,
                        "status": addExpenseResponse.status,
                        "statusText": addExpenseResponse.statusText
                    }
                )
                throw addExpenseResponse.error
            } else {
                setInserted(true)
            }
        } catch (error: any) {} finally {
            setLoading(false)
        }
    }, [])
    return [addExpense, loading, inserted, error] as const
}

export { useGetAllExpense, useAddExpense }