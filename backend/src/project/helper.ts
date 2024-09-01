import { Project } from '@prisma/client';
export const replaceListItem = (
  items: Project[],
  newRank: number,
  direction: boolean,
): Project[] => {
  const newItems = items;
  let _newRank = newRank;

  for (const item of newItems) {
    if (item.order >= newRank) {
      item.order = direction ? _newRank - 2 : _newRank + 2;
      _newRank += 100;
    }
  }
  return newItems;
};
