import { useCallback, useState } from "react"
import { supabase } from "../Utils/supabase"


const env = process.env.EXPO_PUBLIC_ENV || ""


let getUserGroupInfoSQLFunction: string
let getUserInfoSQLFunction: string


if (env == 'local') {
    getUserGroupInfoSQLFunction = 'get_user_group_info'
    getUserInfoSQLFunction = 'get_user_info'
} else {
    getUserGroupInfoSQLFunction = 'get_user_group_info'
    getUserInfoSQLFunction = 'get_user_info'
}


export interface UserGroupData {
    user_id: string;
    group_id: number;
    group_name: string;
    group_admin: string;
}

export interface UserData {
    id: string,
    username: string,
    email: string
}



function useGetUserGroupData() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [userGroupData, setUserGroupData] = useState<UserGroupData[]>([])

    const getUserGroupData = useCallback(async function (user_id: undefined | string) {
        console.log('Get users group data')
        try {
            setLoading(true)
            setError(null)
            setUserGroupData([])
            let getUserGroupDataResponse = await supabase.rpc(getUserGroupInfoSQLFunction, { 'user_id_input': user_id })
            if (getUserGroupDataResponse.error) {
                console.log('Get User Group Data error:')
                console.log(getUserGroupDataResponse.error.message)
                console.log(getUserGroupDataResponse.status)
                console.log(getUserGroupDataResponse.statusText)
                setError(
                    {
                        "error": getUserGroupDataResponse.error,
                        "status": getUserGroupDataResponse.status,
                        "statusText": getUserGroupDataResponse.statusText
                    }
                )
                throw getUserGroupDataResponse.error
            }
            setUserGroupData(getUserGroupDataResponse.data)
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }, [])

    return { getUserGroupData, loading, userGroupData, error } as const
}

function useGetUserData() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [userData, setUserData] = useState<UserData | any>(null)

    const getUserData = useCallback(async function (user_id: undefined | string) {
        console.log('Get users data')
        try {
            setLoading(true)
            setError(null)
            setUserData(null)
            let getUserDataResponse = await supabase.rpc(getUserInfoSQLFunction, { 'user_id_input': user_id }).single()
            if (getUserDataResponse.error) {
                console.log('Get User Data error:')
                console.log(getUserDataResponse.error.message)
                console.log(getUserDataResponse.status)
                console.log(getUserDataResponse.statusText)
                setError(
                    {
                        "error": getUserDataResponse.error,
                        "status": getUserDataResponse.status,
                        "statusText": getUserDataResponse.statusText
                    }
                )
                throw getUserDataResponse.error
            }
            if (getUserDataResponse.data) {
                setUserData(getUserDataResponse.data)
            }

        } catch (error: any) { } finally {
            setLoading(false)
        }
    }, [])

    return { getUserData, loading, userData, error } as const
}

export { useGetUserGroupData, useGetUserData }