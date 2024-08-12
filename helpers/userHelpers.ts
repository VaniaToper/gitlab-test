import { MEMBER_ACCESS_LEVEL } from "../constants/constants";
import { MemberAccessLevelKeysType, MemberType } from "../types/types";

export const mapAccessLevelToAccessGroups = (
  accessLevel: MemberAccessLevelKeysType
) => {
  return MEMBER_ACCESS_LEVEL[accessLevel];
};

export const mergeMembersFromProjectsAndGroups = (
  groupsMembers: MemberType[],
  projectsMembers: MemberType[]
): MemberType[] => {
  const members = [...groupsMembers, ...projectsMembers];

  const mergedMembers: { [key: string]: MemberType } = {};

  members.forEach((member) => {
    const { fullName, projects, groups, userName } = member;

    if (mergedMembers[userName]) {
      mergedMembers[userName].projects = Array.from(
        new Set([...mergedMembers[userName].projects, ...projects])
      );
      mergedMembers[userName].groups = Array.from(
        new Set([...mergedMembers[userName].groups, ...groups])
      );
    } else {
      mergedMembers[userName] = { fullName, userName, groups, projects };
    }
  });

  return Object.values(mergedMembers);
};
