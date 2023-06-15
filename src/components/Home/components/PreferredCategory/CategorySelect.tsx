import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface isLogin {
  isLogin: boolean;
  userId: string | undefined;
}

const CategorySelect = ({ isLogin, userId }: isLogin) => {
  return (
    <Container>
      {isLogin ? (
        <SelectCategory>
          <p className="text-notice">
            <span className="title-point">선호 카테고리</span>가 없습니다.
          </p>
          <p className="text-setting">
            <Link to={`/user/${userId}/update`}>선호 카테고리 설정하기 +</Link>
          </p>
        </SelectCategory>
      ) : (
        <SelectCategory>
          <p className="text-notice">
            <span className="title-point">선호 카테고리</span>가 없습니다.
          </p>
          <p className="text-setting">
            <Link to={'/login'}>선호 카테고리 설정하기 +</Link>
          </p>
        </SelectCategory>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: var(--border-radius-button);
  padding: 30px 20px 40px;
  text-align: center;
  box-shadow: #d7cdd726 0px 0px 3px 3px;

  .text-notice {
    font-size: var(--font-small);

    .title-point {
      font-weight: var(--weight-semi-bold);
      color: var(--color-main);
      text-decoration: underline;
    }
  }

  .text-setting {
    margin-top: 20px;
    font-size: var(--font-medium);
    font-weight: var(--weight-semi-bold);

    @media all and (max-width: 767px) {
      margin-top: 10px;
      font-size: var(--font-regular);
    }
  }

  @media all and (max-width: 767px) {
    width: 90%;
  }
`;

const SelectCategory = styled.div``;

export default CategorySelect;
