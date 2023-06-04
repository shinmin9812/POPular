import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  margin-bottom: 20px;

  * {
    overflow: hidden;
  }

  .thumbnail {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 14px;

    object-fit: cover;

    background-color: #bebebe;
  }

  .post-info {
    padding: 14px 10px;
    .user-info {
      display: flex;
      align-items: center;

      margin-bottom: 10px;

      .user-profile {
        position: relative;
        width: 40px;
        aspect-ratio: 1/1;
        margin-right: 6px;

        border-radius: 50%;
        background-color: #bebebe;
      }

      .user-name {
        position: relative;
        width: 100px;
        height: 20px;
        margin-right: 6px;
        border-radius: 8px;
        background-color: #bebebe;
      }

      .user-followers {
        position: relative;
        background-color: #bebebe;
      }
    }

    .content {
      position: relative;
      width: 100%;
      height: 50px;
      color: #474747;
      border-radius: 8px;
      background-color: #bebebe;
    }
  }
`;

const Shimmer = styled.span`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, rgba(190, 190, 190, 1) 0%, #9d9d9d 50%, rgba(190, 190, 190, 1) 100%);

  animation: shimmer-move 0.8s infinite;

  @keyframes shimmer-move {
    0% {
      left: 0;
    }
    100% {
      left: 100%;
    }
  }
`;

const Skeleton = () => {
  return (
    <Container>
      <div className="thumbnail">
        <Shimmer />
      </div>
      <div className="post-info">
        <div className="user-info">
          <div className="user-profile">
            <Shimmer />
          </div>
          <div className="user-name">
            <Shimmer />
          </div>
          <div className="user-followers">
            <Shimmer />
          </div>
        </div>
        <div className="content">
          <Shimmer />
        </div>
      </div>
    </Container>
  );
};

export default Skeleton;
