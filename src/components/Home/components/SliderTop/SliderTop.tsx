import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
const SliderTop = () => {
  return (
    <SlideFrame>
      <SlideBox>
        <CustomSlider {...settings}>
          <SlideItem>
            <SlideContent></SlideContent>
          </SlideItem>
          <SlideItem>
            <SlideContent></SlideContent>
          </SlideItem>
          <SlideItem>
            <SlideContent></SlideContent>
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
`;

export default SliderTop;
