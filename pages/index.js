import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import noImage from '../public/no_image.png'
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Content = (props) => {
  const [posts, setPosts] = useState(props.posts)
  const [hasMore, setHasmore] = useState(true)
  const [page, setPage] = useState(props.currentPage)

  const getMorePost = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5d98a7a1405b8032e28c31e19e4d10a9&language=en-US&query=a&page=${page}&include_adult=false`
    );
    const newPosts = await res.json();
    const newPosts1 = newPosts.results
    setPosts((post) => [...post, ...newPosts1]);
    setPage(page + 1)
  };

  return (
    <>
      <div className='container'>
        <Head>
          <title>Movie-show Details</title>
          <meta name="title" content="Movie-show Details" />
          <meta name="description" content="Movie show details website using NextJs" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://movie-app-nextjs-dusky.vercel.app/" />
          <meta property="og:title" content="Movie-show Details" />
          <meta property="og:description" content="Movie show details website using NextJs" />
          <meta property="og:image" content="https://i.postimg.cc/gnqyd7mw/movie.jpg" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://movie-app-nextjs-dusky.vercel.app/" />
          <meta property="twitter:title" content="Movie-show Details" />
          <meta property="twitter:description" content="Movie show details website using NextJs" />
          <meta property="twitter:image" content="https://i.postimg.cc/gnqyd7mw/movie.jpg" />
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
        <InfiniteScroll
          dataLength={page}
          next={getMorePost}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
          className='infnity-scroll-class'
        >
          {
            posts.map((item) => {
              return (
                <Link key={item.id} href={`about/${item.id}`}>
                  <div key={item.id} className='card'>
                    <Image
                      src={item.poster_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` : noImage}
                      alt={item.title}
                      height={750}
                      width={500}
                    />
                    <div>
                      <span className='titleforcard'><b>{item.title}</b></span>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </InfiniteScroll>
      </div >
    </>
  );
};

export default Content;

export async function getStaticProps() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US&page=1`
  ).then((response) => response.json());
  const result = data.results
  return {
    props: {
      posts: result,
      currentPage: data.page,
    }
  }
}
