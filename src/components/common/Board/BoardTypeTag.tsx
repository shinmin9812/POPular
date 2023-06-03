import styled from 'styled-components';

const getTagColor = (type: string): string => {
  if (type === 'free') return 'var(--color-tomato)';
  else if (type === 'review') return 'var(--color-green)';
  else return 'var(--color-main)';
};

const getTagName = (type: string): string => {
  if (type === 'free') return '자유게시판';
  else if (type === 'review') return '후기게시판';
  else return '모집게시판';
};

const BoardTypeTag = ({ boardType }: { boardType: string }) => {
  return <TagContainer style={{ backgroundColor: getTagColor(boardType) }}>{getTagName(boardType)}</TagContainer>;
};

export default BoardTypeTag;

const TagContainer = styled.div`
  color: var(--color-white);
  font-size: var(--font-micro);
  font-weight: var(--weight-regular);
  width: 55px;
  padding: 4px 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
