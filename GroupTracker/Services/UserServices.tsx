import { useCallback, useContext, useState } from "react"
import { supabase } from "@/Utils/supabase"
import { UserContext } from "@/Context/UserContext"


const env = process.env.EXPO_PUBLIC_ENV || ""

let getUserGroupInfoSQLFunction: string
let getUserInfoSQLFunction: string
let joinGroupSQLFunction: string
let getAdminGroupsSQLFunction: string


if (env == 'local') {
    getUserGroupInfoSQLFunction = 'get_user_group_info'
    getUserInfoSQLFunction = 'get_user_info'
    joinGroupSQLFunction = 'join_group'
    getAdminGroupsSQLFunction = 'get_admin_groups'
} else {
    getUserGroupInfoSQLFunction = 'get_user_group_info'
    getUserInfoSQLFunction = 'get_user_info'
    joinGroupSQLFunction = 'join_group'
    getAdminGroupsSQLFunction = 'get_admin_groups'
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

export interface Group {
    id: number,
    created_at: string,
    group_name: string,
    group_admin: string
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

function useGetAdminGroups() {
    const [loading, setLoading] = useState<any>(false)
    const [adminGroups, setAdminGroups] = useState([])
    const [error, setError] = useState<any>(null)
    const { user } = useContext(UserContext)

    async function getAdminGroups() {
        console.log('Getting Admin Groups')
        try {
            setAdminGroups([])
            setLoading(true)
            setError(null)
            const userData = { user_id_input: user.id }
            const getAdminGroupsResponse = await supabase.rpc(getAdminGroupsSQLFunction, userData)
            console.log(getAdminGroupsResponse.data)
            if (getAdminGroupsResponse.error) {
                console.log('Get Admin Groups error:')
                console.log(getAdminGroupsResponse.error.message)
                console.log(getAdminGroupsResponse.status)
                console.log(getAdminGroupsResponse.statusText)
                setError(
                    {
                        "error": getAdminGroupsResponse.error,
                        "status": getAdminGroupsResponse.status,
                        "statusText": getAdminGroupsResponse.statusText
                    }
                )
                throw getAdminGroupsResponse.error
            } else if (getAdminGroupsResponse.data) {
                setAdminGroups(getAdminGroupsResponse.data)
            }
        } catch (error: any) { } finally {
            setLoading(false)
        }
    }
    return { getAdminGroups, loading, adminGroups, error } as const
}


export { useGetUserGroupData, useGetUserData, useJoinGroup, useGetAdminGroups }