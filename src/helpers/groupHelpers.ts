import { apiEndpoint } from '../constants/apiEndpoint';
import { api, fetchAllPagesOfEntity } from './apiHelpers';
import { mapAccessLevelToAccessGroups } from './userHelpers';
import { GroupApiType, GroupMemberApiType } from '../types/types';
import { logError } from './errorHandling';

export const getGroupsWithChildrenById = async (groupId: string) => {
  try {
    const topLevelGroupResponse = await api.get<GroupApiType>(apiEndpoint.get.groupDetail(groupId));
    const topLevelGroupChildrenResponse = await fetchAllPagesOfEntity<GroupApiType>(
      apiEndpoint.get.groupChildren(groupId),
    );

    return [topLevelGroupResponse.data, ...topLevelGroupChildrenResponse.data];
  } catch (error: unknown) {
    logError(error, 'An error occurred while loading groups');
  }
};

export const getGroupsMembers = async (groups: GroupApiType[]) => {
  try {
    const groupsMembersPromises = groups.map(async (group) => {
      const groupMembersResponse = await fetchAllPagesOfEntity<GroupMemberApiType>(
        apiEndpoint.get.groupMembers(group.id),
      );

      return groupMembersResponse.data.map((member) => ({
        fullName: member.name,
        userName: member.username,
        groups: [`${group.full_path} (${mapAccessLevelToAccessGroups(member.access_level)})`],
        projects: [], // Projects data isn't currently available
      }));
    });

    const mappedGroupsMembers = await Promise.all(groupsMembersPromises);

    return mappedGroupsMembers.flat();
  } catch (error: unknown) {
    logError(error, 'An error occurred while loading groups members');
  }
};
