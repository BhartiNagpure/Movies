import React, { useState, useEffect } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  const [background, setBackground] = useState("");
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming")

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);


  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
        <Img src={background} />
      </div>}

      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome</span>
          <span className='subTitle'>
            Millions of Movies, TV shows and people
            To discover.
            Explore Now.
          </span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for movies or tv show...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
      <div className='opacity-layer'></div>
    </div>
  )
}

export default HeroBanner
