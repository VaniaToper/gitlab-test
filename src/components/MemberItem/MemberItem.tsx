import { MemberType } from '@/types/types';
import { FC, memo } from 'react';

type MemberItemProps = {
  member: MemberType;
};

export const MemberItem: FC<MemberItemProps> = memo(({ member }) => {
  return (
    <li className="border border-cyan-600 rounded-md p-4">
      <div>
        Full name: <span className="font-bold">{member.fullName}</span>
      </div>
      <div>
        User name: <span className="font-bold">@{member.userName}</span>
      </div>
      <div className="flex gap-2">
        Projects:
        {member.projects.length ? (
          <ul className="flex flex-col">
            {member.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        ) : (
          <div>None</div>
        )}
      </div>
      <div className="flex gap-2">
        Groups:
        {member.groups.length ? (
          <ul className="flex flex-col">
            {member.groups.map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>
        ) : (
          <div>None</div>
        )}
      </div>
    </li>
  );
});
