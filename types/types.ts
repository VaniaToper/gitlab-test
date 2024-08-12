import { MEMBER_ACCESS_LEVEL } from "../constants/constants";

export type MemberAccessLevelKeysType = keyof typeof MEMBER_ACCESS_LEVEL;
export type MemberAccessLevelValuesType =
  typeof MEMBER_ACCESS_LEVEL[MemberAccessLevelKeysType];

export type MemberType = {
  fullName: string;
  userName: string;
  projects: string[];
  groups: string[];
};

export type ProjectMemberApiType = {
  id: number;
  name: string;
  username: string;
  access_level: MemberAccessLevelKeysType;
};

export type GroupMemberApiType = {
  id: number;
  name: string;
  username: string;
  access_level: MemberAccessLevelKeysType;
};

export type GroupApiType = {
  id: number;
  name: string;
  full_path: string;
};

export type ProjectApiType = {
  id: number;
  name: string;
  path_with_namespace: string;
};
