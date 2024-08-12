export const apiEndpoint = {
  get: {
    groupDetail: (id: number) => `/groups/${id}`,
    groupChildren: (id: number) => `/groups/${id}/descendant_groups`,
    groupMembers: (id: number) => `/groups/${id}/members`,
    groupProjects: (id: number) => `/groups/${id}/projects`,
    projectMembers: (id: number) => `/projects/${id}/members`,
  },
};
