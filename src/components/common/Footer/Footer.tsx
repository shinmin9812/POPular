import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Contour = styled.div`
  height: 100%;
  width: 1px;
  background-color: #e1e1e1;

  @media all and (max-width: 1024px) {
    width: 100%;
    height: 1px;
  }
`;

const Container = styled.footer`
  width: calc(100vw - (100vw - 100%));
  height: 300px;
  padding: 40px calc((100vw - 1024px) / 2);
  background-color: #f8f8f8;

  color: #909090;
  font-weight: 300;
  font-size: 14px;
  line-height: 30px;

  .team-info {
    display: grid;
    grid-template-columns: 1.3fr 1px 1fr 1px 1fr;
    column-gap: 20px;

    height: 80%;

    strong {
      font-weight: 500;
      color: #818181;
    }

    .description {
      display: flex;
      align-items: center;
      line-height: 20px;
    }

    .description-sub {
      display: flex;
      align-items: center;

      p {
        font-size: 16px;
        font-weight: 500;
      }
      .phone-number {
        font-size: 28px;
        font-weight: 700;
        color: #595959;

        margin-bottom: 10px;
      }
      .call {
        line-height: 18px;
      }
    }

    .logo {
      display: flex;
      align-items: center;
      filter: grayscale(100%);
    }
  }

  @media all and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 30px 15px;
    padding-bottom: 100px;

    .team-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .logo {
      display: flex;
      align-items: center;
      width: 100%;
      img {
        width: 150px;
        margin: 0 auto;
      }
    }

    .copyright {
      font-size: 12px;
      text-align: center;
    }
  }
`;

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === '/map') return <></>;
  return (
    <Container>
      <div className="team-info">
        <div className="description">
          <p>
            <strong>Team</strong> POPULAR
            <br />
            <strong>With</strong> ELICE SW ENGINEER TRACK 4
            <br />
            <strong>팀장</strong> 신민석 | <strong>팀원</strong> 김서연 김영채 박정민 이준석 황반석 김민규
            <br />
            <strong>주소</strong> 서울 성동구 아차산로17길 48 성수낙낙
          </p>
        </div>
        <Contour />
        <div className="description-sub">
          <div className="call-center">
            <p>고객센터 &gt;</p>
            <div className="phone-number">010-1234-5678</div>
            <div className="call">
              <div className="weekday">
                <strong>평일</strong> 운 좋으면 상담 가능
              </div>
              <div className="weekdend">
                <strong>주말</strong> 안 받음
              </div>
            </div>
          </div>
        </div>
        <Contour />
        <div className="logo">
          <img src="/images/logo.png" alt="POPULAR" />
        </div>
      </div>
      <div className="copyright">© 2023 POPULAR . All rights reserved.</div>
    </Container>
  );
};

export default Footer;
