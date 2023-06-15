import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderTop = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    //autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '50px',
    adaptiveHeight: true,
  };
  return (
    <SlideFrame>
      <SlideBox>
        <CustomSlider {...settings}>
          <SlideItem>
            <SlideContent className="slide-01">
              <TextBox>
                <p className="innertext-1">요즘 많이가는 핫플!🐯</p>
                <p className="innertext-2">'무직타이거' 팝업스토어</p>
                <p className="innertext-3">
                  MZ세대 최애 <b className="bold-text">'무직타이거'</b> 팝업스토어 오픈
                </p>
              </TextBox>
              <InnerImage className="image-1"></InnerImage>
              <Object className="object-animation object-1"></Object>
            </SlideContent>
          </SlideItem>
          <SlideItem>
            <SlideContent className="slide-02">
              <TextBox>
                <p className="innertext-1">리엘 X 더 현대 서울</p>
                <p className="innertext-2">디자이너브랜드 RE_L(리엘)</p>
                <p className="innertext-3">리엘 X 더 현대 서울 팝업 스토어로 초대합니다!</p>
              </TextBox>
              <InnerImage className="image-2"></InnerImage>
              <InnerImage className="image-2-1"></InnerImage>
              <Object className="object-animation object-2"></Object>
            </SlideContent>
          </SlideItem>
          <SlideItem>
            <SlideContent className="slide-03">
              <TextBox>
                <p className="innertext-1">맛있는 커피와 함께!</p>
                <p className="innertext-2">'블루보틀' 팝업스토어</p>
                <p className="innertext-3">MZ세대 최애 '무직타이거' 팝업스토어 오픈</p>
              </TextBox>
              <InnerImage className="image-3"></InnerImage>
              <Object className="object-animation object-3"></Object>
            </SlideContent>
          </SlideItem>
        </CustomSlider>
      </SlideBox>
    </SlideFrame>
  );
};

const SlideFrame = styled.div`
  height: 270px;
`;
const SlideBox = styled.div`
  width: 100%;
  position: absolute;
  top: 110px;
  left: 0px;
`;
const SlideItem = styled.div``;
const SlideContent = styled.div`
  width: 98%;
  height: 240px;
  background-color: orange;
  border-radius: 8px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &.slide-01 {
    background-color: lemonchiffon;
  }

  &.slide-02 {
    background-color: lightblue;
  }

  &.slide-03 {
    background-color: rgb(241 241 241);
  }
`;
const TextBox = styled.div`
  position: absolute;
  top: 29%;
  left: 15%;
  z-index: 5;

  .innertext-1 {
    font-size: var(--font-medium);
  }

  .innertext-2 {
    margin-top: 7px;
    font-size: var(--font-medium);
    font-weight: var(--weight-semi-bold);
  }

  .innertext-3 {
    margin-top: 20px;
    font-size: var(--font-regular);
    font-weight: var(--weight-light);

    @media all and (max-width: 767px) {
      display: none;
    }

    .bold-text {
      font-weight: var(--weight-semi-bold);
    }
  }

  @media all and (max-width: 767px) {
    left: 6%;
  }
`;

const InnerImage = styled.div`
  position: absolute;

  &.image-1 {
    background: linear-gradient(to right, lemonchiffon, lemonchiffon 10%, transparent),
      url('/images/main-back.jpeg') no-repeat;
    background-size: contain;
    background-position: center top;
    right: 0px;
    opacity: 0.4;
    z-index: 3;
    width: 400px;
    height: 500px;
  }

  &.image-2 {
    background: url('/images/main-back2.png') no-repeat;
    background-size: contain;
    background-position: center top;
    right: -45px;
    bottom: -140px;
    z-index: 3;
    width: 700px;
    height: 500px;
  }

  &.image-2-1 {
    background: url('/images/main-back2.png') no-repeat;
    background-size: contain;
    background-position: center top;
    right: -270px;
    top: -80px;
    z-index: 3;
    width: 800px;
    height: 400px;
  }

  &.image-3 {
    background: linear-gradient(to right, rgb(241 241 241), rgb(241 241 241) 10%, transparent),
      url('/images/main-back3.jpg') no-repeat;
    background-size: contain;
    background-position: center top;
    right: -14px;
    bottom: 0px;
    opacity: 0.5;
    z-index: 3;
    width: 500px;
    height: 400px;
  }
`;

const Object = styled.div`
  z-index: 20;
  @keyframes identifier {
    0% {
      transform: translateY(80px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  &.object-1 {
    background: url('/images/tiger.png') no-repeat;
    width: 170px;
    height: 170px;
    background-size: contain;

    position: absolute;
    bottom: 0;
    right: 20%;
    animation: identifier 0.9s;
  }

  &.object-2 {
    background: url('/images/rabbit.png') no-repeat;
    width: 300px;
    height: 300px;
    background-size: contain;

    position: absolute;
    bottom: -40px;
    right: 15%;
    animation: identifier 0.9s;
  }

  &.object-3 {
    background: url('/images/bottle.png') no-repeat;
    width: 200px;
    height: 200px;
    background-size: contain;
    z-index: 4;

    position: absolute;
    bottom: 0;
    right: 20%;
    animation: identifier 0.9s;
  }

  @media all and (max-width: 767px) {
    right: 5%;
    width: 120px;
    height: 120px;
  }
`;

const CustomSlider = styled(Slider)`
  .slick-slide {
    opacity: 0.6;
  }
  .slick-active {
    opacity: 1;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
  }
  .slick-arrow {
    display: none !important;
  }
  .slick-dots li {
    margin: 0px;
  }
  .slick-dots li button:before {
    font-size: 50px;
    line-height: 0px;
    content: '.';
  }
  .slick-dots li.slick-active button:before {
    color: var(--color-sub);
  }

  .slick-slide .object-animation {
    opacity: 0;
    transition: all 0.9s;
    transform: translateY(80px);
  }

  .slick-slide.slick-active .object-animation {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default SliderTop;
