import styled from 'styled-components';
import LikeIcon from '../../common/Icons/LikeIcon';
import ReportIcon from '../../common/Icons/ReportIcon';

const NameWrap = styled.span`
  margin-top: 5px;
`;

const Button = styled.button`
  display: flex;
  width: fit-content;
  flex-direction: column;
  background: none;
  align-items: center;
  font-size: var(--font-small);
  font-weight: 600;
  color: #a7a7a7;
  transition: all 0.4s;
  cursor: pointer;

  &.active {
    transform: scale(1.4);
    color: #161616;
  }

  svg {
    transition: all 0.5s;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  width: fit-content;
  justify-content: space-around;
  gap: 50px;
  margin: 0 auto;
`;

const LikesAndReports = ({
  checkLike,
  checkReport,
  likes,
  reports,
  onClick,
}: {
  checkLike: boolean | undefined;
  checkReport: boolean | undefined;
  likes: number | undefined;
  reports: number | undefined;
  onClick: (isLike: string) => Promise<void>;
}) => {
  return (
    <ButtonWrap>
      <Button
        onClick={() => {
          onClick('like');
        }}
        className={checkLike ? 'active' : ''}
      >
        <LikeIcon fill={checkLike ? 'var(--color-main)' : 'var(--color-gray)'} />
        <NameWrap>좋아요</NameWrap>
        <span>{likes}</span>
      </Button>
      <Button
        onClick={() => {
          onClick('report');
        }}
        className={checkReport ? 'active' : ''}
      >
        <ReportIcon fill={checkReport ? 'var(--color-red)' : 'var(--color-gray)'} />
        <NameWrap>싫어요</NameWrap>
        <span>{reports}</span>
      </Button>
    </ButtonWrap>
  );
};

export default LikesAndReports;
