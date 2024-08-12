import * as dotenv from "dotenv";

dotenv.config();

import {
  getGroupIdFromConsole,
  getGroupsMembers,
  getGroupsWithChildrenById,
} from "./helpers/groupHelpers";
import { getGroupProjects, getProjectsMembers } from "./helpers/projectHelpers";
import { MemberType } from "./types/types";
import { mergeMembersFromProjectsAndGroups } from "./helpers/userHelpers";

const getMembersFromGroupsAndProjects = async () => {
  const groupIdFromConsole = getGroupIdFromConsole();

  if (!groupIdFromConsole) {
    return console.error("No group ID was provided");
  }

  const groups = await getGroupsWithChildrenById(groupIdFromConsole);

  if (!groups?.length) {
    return console.error("No groups found");
  }

  const groupsMembers = await getGroupsMembers(groups);

  if (!groupsMembers) {
    return console.error("No groups members found");
  }

  const projects = await getGroupProjects(groups);
  let projectsMembers: MemberType[] = [];

  if (projects) {
    projectsMembers = (await getProjectsMembers(projects)) ?? [];
  }

  const mergedMembers = mergeMembersFromProjectsAndGroups(
    groupsMembers,
    projectsMembers
  );

  console.log(JSON.stringify(mergedMembers, undefined, 4));
  console.log(`Total Users: ${mergedMembers.length}`);
};

getMembersFromGroupsAndProjects();
