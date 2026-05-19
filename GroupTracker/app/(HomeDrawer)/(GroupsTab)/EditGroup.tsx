import { UserContext } from "@/Context/UserContext";
import {
  CustomDropDown,
  CustomTextInput,
} from "@/CustomComponents/CustomInputs";
import { useShowToast } from "@/CustomComponents/CustomToast";
import { COLORS } from "@/Globals/GlobalConstants";
import { useUpdateGroupService } from "@/Services/GroupServices";
import {
  useGetUserAdminGroups,
  Group,
  useGetUserGroupData,
} from "@/Services/UserServices";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface NewGroupData {
  id: number;
  group_name: string;
  isDefault?: boolean;
}

export default function EditGroup() {
  const { user } = useContext(UserContext);
  const getUserAdminGroupsService = useGetUserAdminGroups();
  const updateGroupService = useUpdateGroupService();
  const [open, setOpen] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<any>();
  const [newGroupData, setNewGroupData] = useState<NewGroupData>({
    id: 0,
    group_name: "",
    isDefault: false,
  });
  const toast = useShowToast();

  useEffect(() => {
    getUserAdminGroupsService.getUserAdminGroups();
  }, []);

  useEffect(() => {
    if (!updateGroupService.loading) {
      if (updateGroupService.error) {
        console.log(updateGroupService.error);
        toast.showToast("error", "Failed to update group.");
      } else {
        if (updateGroupService.updated) {
          console.log("Updated group successfully");
          toast.showToast("success", "Successfully updated group.");
          router.replace("/");
        }
      }
    }
  }, [
    updateGroupService.loading,
    updateGroupService.updated,
    updateGroupService.error,
  ]);

  function updateGroupPressed() {
    console.log("Updated group pressed");
    updateGroupService.updateGroup(
      newGroupData.id,
      newGroupData.group_name,
      newGroupData.isDefault || false,
    );
    setDisableUpdate(true);
  }

  return (
    <View style={{ padding: 20, gap: 10, alignSelf: "center", width: "90%" }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>Edit Group</Text>
      </View>
      <CustomDropDown
        value={selectedGroup?.value}
        items={user?.userGroupData?.map((groupData: Group) => {
          return {
            label: groupData.group_name,
            value: groupData.group_id,
            isAdmin: groupData.group_admin === user.id,
          };
        })}
        open={open}
        setOpen={setOpen}
        onSelectItem={(value: { label: any; value: any; isAdmin: boolean }) => {
          setSelectedGroup(value);
          setNewGroupData({
            ...newGroupData,
            id: value.value,
            group_name: value.label,
            isDefault: value.value === user?.default_group_id
          });
          setDisableUpdate(false);
          console.log(value);
        }}
      />
      {selectedGroup && (
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Group Name: </Text>
            <CustomTextInput
              mainStyleProps={{
                flex: 1,
                opacity: !selectedGroup.isAdmin ? 0.5 : 1,
              }}
              value={newGroupData.group_name}
              onChangeText={(text: string) => {setNewGroupData({...newGroupData, group_name: text})}}
              disabled={!selectedGroup.isAdmin}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Set as default: </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value: boolean) => {setNewGroupData({...newGroupData, isDefault: value})}}
              value={newGroupData.isDefault}
            />
          </View>
          <TouchableOpacity
            onPress={updateGroupPressed}
            disabled={disableUpdate}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.LIGHT_GREEN,
              borderRadius: 10,
              height: 50,
              opacity: disableUpdate ? 0.5 : 1,
            }}
          >
            <Text style={{ fontSize: 20 }}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
