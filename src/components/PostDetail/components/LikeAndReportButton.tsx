import styled from 'styled-components';
import LikeIcon from '../../common/Icons/LikeIcon';
import ReportIcon from '../../common/Icons/ReportIcon';

const NameWrap = styled.span`
  margin-top: 5px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  background: none;
  align-items: center;
  font-size: var(--font-small);
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 120px;
  justify-content: space-around;
  margin-top: 10px;
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
      >
        <LikeIcon fill={checkLike ? 'var(--color-main)' : 'var(--color-gray)'} />
        <NameWrap>좋아요</NameWrap>
        {/* <span>{likes}</span> */}
      </Button>
      <Button
        onClick={() => {
          onClick('report');
        }}
      >
        <ReportIcon fill={checkReport ? 'var(--color-main)' : 'var(--color-gray)'} />
        <NameWrap>싫어요</NameWrap>
        {/* <span>{reports}</span> */}
      </Button>
    </ButtonWrap>
  );
};

export default LikesAndReports;
