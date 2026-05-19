import { useContext, useState } from "react"
import { supabase } from "@/Utils/supabase"
import { UserContext } from "@/Context/UserContext"

const env = process.env.EXPO_PUBLIC_ENV || ""

let updateGroupSQLFunction: string
let joinGroupSQLFunction: string

if (env == 'local') {
    joinGroupSQLFunction = 'join_group'
    updateGroupSQLFunction = 'update_group'
} else {
    joinGroupSQLFunction = 'join_group'
    updateGroupSQLFunction = 'update_group'
}

function useJoinGroup() {
    const [loading, setLoading] = useState<any>(false)
    const [joined, setJoined] = useState(false)
    const [error, setError] = useState<any>(null)
    const { user, refreshData } = useContext(UserContext)

    async function joinGroup(groupId: number) {
        console.log('Joining Group')
        console.log(groupId)
        try {
            setJoined(false)
            setLoading(true)
            setError(null)
            const joinGroupData = { user_id_input: user.id, group_id_input: groupId }
            const joinGroupResponse = await supabase.rpc(joinGroupSQLFunction, joinGroupData)
            console.log(joinGroupResponse.data)
            if (joinGroupResponse.error) {
                console.log('Join Group error:')
                console.log(joinGroupResponse.error.message)
                console.log(joinGroupResponse.status)
                console.log(joinGroupResponse.statusText)
                setError(
                    {
                        "error": joinGroupResponse.error,
                        "status": joinGroupResponse.status,
                        "statusText": joinGroupResponse.statusText
                    }
                )
                throw joinGroupResponse.error
            } else {
                await new Promise(r => setTimeout(r, 3000));
                setJoined(true)
                refreshData()
            }
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }
    return { joinGroup, loading, joined, error } as const
}

function useUpdateGroupService() {
    const [loading, setLoading] = useState<any>(false)
    const [error, setError] = useState<any>(null)
    const [updated, setUpdated] = useState<boolean>(false)
    const { user, refreshData } = useContext(UserContext)

    async function updateGroup(group_id_input: number, new_group_name_input: string, is_default_input: boolean) {
        console.log('Updating group')
        try {
            setLoading(true)
            setError(null)
            setUpdated(false)
            console.log("HERE IS EVERYTHING")
            console.log(group_id_input)
            console.log(new_group_name_input)
            console.log(user.id)
            console.log("END")
            const groupUpdateResponse = await supabase.rpc(updateGroupSQLFunction, {
                user_id_input: user.id,
                group_id_input: group_id_input, 
                group_admin_input: user.id,
                new_group_name_input: new_group_name_input, 
                is_default_input: is_default_input
            })
            if (groupUpdateResponse.error) {
                console.log('Update group error:')
                console.log(groupUpdateResponse.error.message)
                console.log(groupUpdateResponse.status)
                console.log(groupUpdateResponse.statusText)
                setError({
                    "error": groupUpdateResponse.error,
                    "status": groupUpdateResponse.status,
                    "statusText": groupUpdateResponse.statusText,
                })
                throw groupUpdateResponse.error
            } else {
                await new Promise(r => setTimeout(r, 3000));
                setUpdated(true)
                refreshData()
            }
        }
        catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return { updateGroup, loading, error, updated } as const
}
export { useJoinGroup, useUpdateGroupService }