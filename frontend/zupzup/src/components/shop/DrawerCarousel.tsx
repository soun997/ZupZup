import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Food } from 'types/Food';
import { DrawerFrame } from './DrawerFrame';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { BlankFrame } from 'components';

interface Props {
  foodList: Food[];
}
const DrawerCarousel = ({ foodList }: Props) => {
  const chunkSize = 9;
  const chunks: Food[][] = [];
  for (let i = 0; i < foodList.length; i += chunkSize) {
    chunks.push(foodList.slice(i, i + chunkSize));
  }
  return (
    <S.Container>
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
      >
        {chunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <BlankFrame margin={70} />
            <DrawerFrame foodList={chunk.slice(0, 3)} />

            {chunk.length > 3 && (
              <>
                <BlankFrame margin={60} />
                <DrawerFrame foodList={chunk.slice(3, 6)} />
              </>
            )}
            {chunk.length > 6 && (
              <>
                <BlankFrame margin={60} />
                <DrawerFrame foodList={chunk.slice(6, 9)} />
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </S.Container>
  );
};

interface StyleProps {
  margin: number;
}

const S = {
  Container: styled.div`
    display: flex;
    flex-wrap: wrap;
    /* overflow: hidden; */
    justify-content: space-between;
    height: 100dvh;
    width: 100%;

    & .swiper-slide {
      width: 100%;
    }
    & .swiper-wrapper {
      display: -webkit-inline-box;
    }

    & .swiper-pagination {
      margin-top: -20px;
    }

    & .swiper-scrollbar-drag,
    & .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.color.main};
    }
  `,

  BlankFrame: styled.div<StyleProps>`
    margin-top: ${({ margin }) => margin}px;
  `,
};

export default DrawerCarousel;
