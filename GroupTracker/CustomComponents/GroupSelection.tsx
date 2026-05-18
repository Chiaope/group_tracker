import { CustomDropDown } from './CustomInputs';
import { useContext, useState } from 'react';
import { UserGroupData } from '@/Services/UserServices';
import { UserContext } from '@/Context/UserContext';

export default function GroupSelection() {
    const [open, setOpen] = useState(false)
    const { user, setUser } = useContext(UserContext)

    if (!user || !user.userGroupData) {
        return <div>Loading groups...</div>; // Or return null;
    }

    return <>
        <CustomDropDown
            value={user.selectedGroup}
            items={user.userGroupData.map((groupData: UserGroupData) => { return { 'label': groupData.group_name, 'value': groupData.group_id } })}
            open={open}
            setOpen={setOpen}
            onSelectItem={(value: { value: any }) => {
                setUser({ ...user, 'selectedGroup': value.value })
            }}
        />
    </>
}