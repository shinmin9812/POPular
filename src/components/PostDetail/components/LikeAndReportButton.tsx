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

const LikesAndReports = () => {
  return (
    <ButtonWrap>
      <Button>
        <LikeIcon />
        좋아요
      </Button>
      <Button>
        <ReportIcon />
        <ReportNameWrap>신고하기</ReportNameWrap>
      </Button>
    </ButtonWrap>
  );
};

export default LikesAndReports;
