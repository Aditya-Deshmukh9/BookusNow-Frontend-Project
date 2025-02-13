import { ArrowRight, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import EventBox from "./EventBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import GlobalApi from "../Utilts/GlobalApi";

function RecommendedShows() {
  const [recomdata, setRecomdata] = useState([]);
  const [page, setPage] = useState(2);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecomShow();
  }, [page]);

  const getRecomShow = () => {
    GlobalApi.RecommendedEvents(page)
      .then((res) => {
        setRecomdata((prevData) => [...prevData, ...res.data.events]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommended events:", error);
        setError(true);
        setLoading(false);
      });
  };

  const handleSlideChange = (swiper) => {
    const { isEnd } = swiper;
    if (isEnd && !loading) {
      console.log(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="h-[550px] -mt-80 md:-mt-52 text-white relative z-20 md:px-24">
      <div className="flex items-center mb-4 py-1 mx-4 justify-between">
        <p className="flex items-center font-semibold md:text-xl gap-x-2">
          Recommended shows <ArrowRight />
        </p>
        <p className="underline">See all</p>
      </div>

      <div className="ml-4">
        <Swiper
          lazy="true"
          watchSlidesProgress={true}
          slidesPerView={1}
          spaceBetween={2}
          pagination={{ clickable: true }}
          breakpoints={{
            "@0.00": { slidesPerView: 1, spaceBetween: 10 },
            "@0.75": { slidesPerView: 2, spaceBetween: 20 },
            "@1.00": { slidesPerView: 3, spaceBetween: 40 },
            "@1.50": { slidesPerView: 4, spaceBetween: 50 },
          }}
          className="mySwiper"
          onSlideChange={(swiper) => handleSlideChange(swiper)}
        >
          {recomdata.map((event, index) => (
            <SwiperSlide key={index}>
              <EventBox {...event} />
            </SwiperSlide>
          ))}
          {loading && (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          )}
        </Swiper>
      </div>
      {error && <h1>Failed to fetch recommended events.</h1>}
    </div>
  );
}

export default RecommendedShows;
