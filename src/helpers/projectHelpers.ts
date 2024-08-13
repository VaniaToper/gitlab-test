import { apiEndpoint } from '../constants/apiEndpoint';
import { fetchAllPagesOfEntity } from './apiHelpers';
import { GroupApiType, ProjectApiType, ProjectMemberApiType } from '../types/types';
import { logError } from './errorHandling';
import { mapAccessLevelToAccessGroups } from './userHelpers';

export const getGroupProjects = async (groups: GroupApiType[]) => {
  try {
    const projectsPromises = groups.map(async (group) => {
      const projectResponse = await fetchAllPagesOfEntity<ProjectApiType>(apiEndpoint.get.groupProjects(group.id));

      return projectResponse.data;
    });

    const projects = await Promise.all(projectsPromises);

    return projects.flat();
  } catch (error: unknown) {
    logError(error, 'An error occurred while loading group projects');
  }
};

export const getProjectsMembers = async (projects: ProjectApiType[]) => {
  try {
    const projectsMembersPromises = projects.map(async (project) => {
      const projectMembersResponse = await fetchAllPagesOfEntity<ProjectMemberApiType>(
        apiEndpoint.get.projectMembers(project.id),
      );

      return projectMembersResponse.data.map((member) => ({
        fullName: member.name,
        userName: member.username,
        groups: [], // Groups data isn't currently available
        projects: [`${project.path_with_namespace} (${mapAccessLevelToAccessGroups(member.access_level)})`],
      }));
    });

    const mappedProjectsMembers = await Promise.all(projectsMembersPromises);

    return mappedProjectsMembers.flat();
  } catch (error: unknown) {
    logError(error, 'An error occurred while loading project members');
  }
};
