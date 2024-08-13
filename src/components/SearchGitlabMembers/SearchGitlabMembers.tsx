'use client';
import { FC } from 'react';
import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button';
import { useSearchGitlabMembersResult } from './searchGitlabMembersHelpers';
import { SpinnerIcon } from '../Spinner/Spinner';
import { MemberItem } from '../MemberItem/MemberItem';

export const SearchGitlabMembers: FC = () => {
  const {
    errorMessage,
    isFetchingMembers,
    membersByGroupId,
    onSearchByGroupIdSubmit,
    searchString,
    onSearchStringChange,
  } = useSearchGitlabMembersResult();

  return (
    <div className="flex flex-col max-w-[1440px] px-4 mx-auto mt-20 items-center w-full gap-4">
      <TextInput
        placeholder="Type group id..."
        onChange={onSearchStringChange}
        value={searchString}
        onKeyDown={(e) => e.key === 'Enter' && onSearchByGroupIdSubmit()}
      />
      <Button type="submit" onClick={onSearchByGroupIdSubmit}>
        Search {isFetchingMembers && <SpinnerIcon className="w-4" />}
      </Button>
      {errorMessage}
      <ul className="flex flex-col gap-4">
        {membersByGroupId.map((member) => (
          <MemberItem member={member} key={member.userName} />
        ))}
      </ul>
    </div>
  );
};
