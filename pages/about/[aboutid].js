import styles from '../../styles/About.module.css'
import Link from "next/link"
import Head from 'next/head'
import noImage from '../../public/no_image.png'
import Image from 'next/image'

function About({ posts }) {
    return (
        <div>
            <Head>
                <title>{posts.title}</title>
                <meta name="description" content={posts.overview} />
                <link rel="icon" href={`https://www.themoviedb.org/t/p/w220_and_h330_face${posts.poster_path}`} />
            </Head>
            {posts ? (
                <>
                    <Link href='/'>
                        <button style={{ marginTop: '1rem', cursor: 'pointer' }}>Go back</button>
                    </Link>
                    <div className={styles.movie_card} id={styles.bright}>
                        <div className={styles.info_section}>
                            <div className={styles.movie_header}>
                                <Image
                                    src={posts.poster_path !== null ? `https://www.themoviedb.org/t/p/w220_and_h330_face${posts.poster_path}` : noImage}
                                    alt={posts.title}
                                    className={styles.locandina}
                                    width={80}
                                    height={80}
                                />
                                <h1>{posts?.title}</h1>
                                <h4>{posts?.release_date}, {posts.original_language}</h4>

                            </div>
                            <div className={styles.movie_desc}>
                                <p className={styles.text}>
                                    {posts.overview}
                                </p>
                                <span className={styles.minutes}>{posts.runtime} min</span>
                                <p className={styles.type}>Action, Crime, Fantasy</p>
                            </div>
                        </div>
                        <div className={`${styles.blur_back} ${styles.bright_back}`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w220_and_h330_face${posts?.backdrop_path})` }} ></div>
                    </div>
                </>
            ) : (
                <div className={styles.lodebal}>
                    <h1>Something Wrong</h1>
                </div>
            )}
        </div>
    )
}

export default About;

export async function getStaticPaths() {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US&page=1')
    const data = await response.json()
    const result = data.results

    const paths = result.map(post => {
        return {
            params: {
                aboutid: `${post.id}`
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(`https://api.themoviedb.org/3/movie/${params.aboutid}?api_key=ef2fc7966b7886b23c82a2279f82783c&language=en-US`)
    const data = await response.json()
    return {
        props: {
            posts: data,
        }
    }
}
