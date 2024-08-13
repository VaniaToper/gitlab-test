import { getGroupsMembers, getGroupsWithChildrenById } from '@/helpers/groupHelpers';
import { getGroupProjects, getProjectsMembers } from '@/helpers/projectHelpers';
import { mergeMembersFromProjectsAndGroups } from '@/helpers/userHelpers';
import { MemberType } from '@/types/types';
import { ChangeEvent, useState } from 'react';

export const useSearchGitlabMembersResult = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [membersByGroupId, setMembersByGroupId] = useState<MemberType[]>([]);
  const [isFetchingMembers, setIsFetchingMembers] = useState(false);

  const onSearchStringChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const resetSearchResults = () => {
    setIsFetchingMembers(false);
    setMembersByGroupId([]);
  };

  const onSearchByGroupIdSubmit = async () => {
    setIsFetchingMembers(true);
    setErrorMessage(undefined);

    if (!searchString) {
      resetSearchResults();
      setErrorMessage('No group ID was provided');
      return;
    }

    const groups = await getGroupsWithChildrenById(searchString);

    if (!groups?.length) {
      resetSearchResults();
      setErrorMessage('No groups found');
      return;
    }

    const groupsMembers = await getGroupsMembers(groups);

    if (!groupsMembers) {
      resetSearchResults();
      setErrorMessage('No groups members found');
      return;
    }

    const projects = await getGroupProjects(groups);
    let projectsMembers: MemberType[] = [];

    if (projects) {
      projectsMembers = (await getProjectsMembers(projects)) ?? [];
    }

    const mergedMembers = mergeMembersFromProjectsAndGroups(groupsMembers, projectsMembers);

    setMembersByGroupId(mergedMembers);
    setIsFetchingMembers(false);
  };

  return {
    onSearchByGroupIdSubmit,
    searchString,
    errorMessage,
    isFetchingMembers,
    membersByGroupId,
    onSearchStringChange,
  };
};
