import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderTop = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
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
                <p className="innertext-1">요즘 많이가는 핫플!</p>
                <p className="innertext-2">'무직타이거' 팝업스토어</p>
                <p className="innertext-3">MZ세대 최애 '무직타이거' 팝업스토어 오픈</p>
              </TextBox>
              <InnerImage></InnerImage>
              <Object></Object>
            </SlideContent>
          </SlideItem>
          <SlideItem>
            <SlideContent className="slide-02">
              <TextBox>
                <p className="innertext-1">요즘 많이가는 핫플!</p>
                <p className="innertext-2">'무직타이거' 팝업스토어</p>
                <p className="innertext-3">MZ세대 최애 '무직타이거' 팝업스토어 오픈</p>
              </TextBox>
              <InnerImage></InnerImage>
              <Object></Object>
            </SlideContent>
          </SlideItem>
          <SlideItem>
            <SlideContent className="slide-03">
              <TextBox>
                <p className="innertext-1">요즘 많이가는 핫플!</p>
                <p className="innertext-2">'무직타이거' 팝업스토어</p>
                <p className="innertext-3">MZ세대 최애 '무직타이거' 팝업스토어 오픈</p>
              </TextBox>
              <InnerImage></InnerImage>
              <Object></Object>
            </SlideContent>
          </SlideItem>
        </CustomSlider>
      </SlideBox>
    </SlideFrame>
  );
};

const SlideFrame = styled.div`
  height: 200px;
`;
const SlideBox = styled.div`
  width: 100%;
  position: absolute;
  top: 110px;
  left: 0px;
`;
const SlideItem = styled.div``;
const SlideContent = styled.div`
  width: 97%;
  height: 180px;
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
    background-color: #d4c2dc;
  }
`;
const TextBox = styled.div`
  position: absolute;
  top: 27%;
  left: 15%;
  z-index: 5;

  .innertext-1 {
    font-size: var(--font-small);
  }

  .innertext-2 {
    margin-top: 5px;
    font-size: var(--font-medium);
    font-weight: var(--weight-semi-bold);
  }

  .innertext-3 {
    margin-top: 20px;
    font-size: var(--font-micro);
  }
`;

const InnerImage = styled.div`
  position: absolute;
  right: 0px;
  background: linear-gradient(to right, lemonchiffon, lemonchiffon 10%, transparent),
    url('/images/main-back.jpeg') no-repeat;
  opacity: 0.4;
  z-index: 3;
  background-size: contain;
  background-position: center top;
  width: 340px;
  height: 500px;
`;

const Object = styled.div`
  background: url('/images/tiger.png') no-repeat;
  z-index: 20;
  width: 130px;
  height: 130px;
  background-size: contain;
  z-index: 4;

  position: absolute;
  bottom: 0;
  right: 20%;
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
    font-size: 40px;
    line-height: 0px;
    content: '.';
  }
  .slick-dots li.slick-active button:before {
    color: var(--color-sub);
  }

  /* .slick-active .object-item {

  } */
`;

export default SliderTop;
