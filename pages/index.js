import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import noImage from '../public/no_image.png'

function Home({ posts }) {
  return (
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
      {
        posts.map((post) => {
          return (
            <div key={post.id} className='movieresult'>
              <Link href={`about/${post.id}`}>
                <div key={post.id} className='card'>
                  <Image
                    src={post.poster_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${post.poster_path}` : noImage}
                    alt={post.title}
                    height={750}
                    width={500}
                  />
                  <div>
                    <span className='titleforcard'><b>{post.title}</b></span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })

      }
    </div >
  )
}

export default Home;
export async function getStaticProps() {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US&page=1')
  const data = await response.json()
  const result = data.results
  return {
    props: {
      posts: result,
    }
  }
}
