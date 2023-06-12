import styled from 'styled-components';
import LikeIcon from '../../common/Icons/LikeIcon';
import ReportIcon from '../../common/Icons/ReportIcon';

const ReportNameWrap = styled.span`
  margin-top: 3px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  background: none;
  align-items: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
`;

const LikesAndReports = ({
  likes,
  reports,
  onClick,
}: {
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
        <LikeIcon />
        좋아요
        <span>{likes}</span>
      </Button>
      <Button
        onClick={() => {
          onClick('report');
        }}
      >
        <ReportIcon />
        <ReportNameWrap>신고하기</ReportNameWrap>
        <span>{reports}</span>
      </Button>
    </ButtonWrap>
  );
};

export default LikesAndReports;
