import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Food } from 'types/Food';
import { DrawerFrame } from './DrawerFrame';

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
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        pagination={{ clickable: true }}
      >
        {chunks.map((chunk, index) => (
          <SwiperSlide key={index}>
            <S.BlankFrame margin={70} />
            <DrawerFrame foodList={chunk.slice(0, 3)} />

            {chunk.length > 3 && (
              <>
                <S.BlankFrame margin={60} />
                <DrawerFrame foodList={chunk.slice(3, 6)} />
              </>
            )}
            {chunk.length > 6 && (
              <>
                <S.BlankFrame margin={80} />
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
    overflow: hidden;
    justify-content: space-between;
    & .swiper {
      width: 100%;
    }
    & .each-slide {
      cursor: pointer;
    }
    & .swiper-slide {
      width: 100%;
    }
    & .swiper-wrapper {
      display: -webkit-inline-box;
    }

    & .swiper-button-prev,
    & .swiper-button-next {
      color: ${({ theme }) => theme.color.main};
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
