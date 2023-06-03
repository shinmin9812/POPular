import styled from 'styled-components';
import { BoardTypes } from '../../../types/board';
import * as React from 'react';

interface boardMapType {
  name: string;
  color: string;
}

const boardMap = new Map<string, boardMapType>([
  [BoardTypes.free, { name: '자유게시판', color: 'var(--color-tomato)' }],
  [BoardTypes.gether, { name: '모집게시판', color: 'var(--color-main)' }],
  [BoardTypes.review, { name: '후기게시판', color: 'var(--color-green)' }],
]);

const BoardTypeTag = React.memo(({ boardType }: { boardType: BoardTypes }) => {
  const { name, color } = boardMap.get(boardType) as boardMapType;
  return <TagContainer color={color}>{name}</TagContainer>;
});

export default BoardTypeTag;

const TagContainer = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55px;

  padding: 4px 0;

  border-radius: 4px;

  color: var(--color-white);
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);

  background-color: ${(props) => props.color};
`;
