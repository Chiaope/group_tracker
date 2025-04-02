import { useContext, useState } from "react"
import { supabase } from "../Utils/supabase"
import { UserContext } from "../Context/UserContext"

const getCategoryListSQLFunction = 'get_category_list'

function useCategoryService() {
    const [loading, setLoading] = useState<any>(false)
    const [mappedCategoryList, setMappedCategoryList] = useState<any>([])
    const [error, setError] = useState<any>(null)
    const { user } = useContext(UserContext)

    async function getMappedCategoryList() {
        console.log('Getting Mapped Categories')
        try {
            setLoading(true)
            setError(null)
            console.log('user group')
            console.log(user.selectedGroup)
            const categoryResponse = await supabase.rpc(getCategoryListSQLFunction, {
                group_id_input: user.selectedGroup
            })
            const mappedCategoryList = categoryResponse.data.map(
                (category: any) => {
                    return {
                        value: category.category,
                        label: category.category,
                        color: category.color
                    }
                }
            )
            if (categoryResponse.error) {
                console.log('Get category error:')
                console.log(categoryResponse.error.message)
                console.log(categoryResponse.status)
                console.log(categoryResponse.statusText)
                setError({
                    "error": categoryResponse.error,
                    "status": categoryResponse.status,
                    "statusText": categoryResponse.statusText,
                })
                throw categoryResponse.error
            }
            setMappedCategoryList(mappedCategoryList)
        }
        catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return { getMappedCategoryList, mappedCategoryList, loading, error } as const
}
export { useCategoryService }