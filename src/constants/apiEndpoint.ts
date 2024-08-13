export const apiEndpoint = {
  get: {
    groupDetail: (id: number | string) => `/groups/${id}`,
    groupChildren: (id: number | string) => `/groups/${id}/descendant_groups`,
    groupMembers: (id: number | string) => `/groups/${id}/members`,
    groupProjects: (id: number | string) => `/groups/${id}/projects`,
    projectMembers: (id: number | string) => `/projects/${id}/members`,
  },
};
