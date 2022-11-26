import Head from 'next/head';
import Link from 'next/link';

import utilStyles from '../styles/utils.module.css';

import { getSortedPostsFromGit } from '../lib/posts';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';

export async function getServerSideProps() {
  const allPostsData = await getSortedPostsFromGit();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData  }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, my name is Josias Leal. I'm a fullstack developer and I'm passionate about learning new things. 
          Currently I'm working with VueJS, React, React Native and Java, and I hope I can bring some knowledge for you
          through this Blog.
          If you want to see more tech content, thi is my <a href="https://www.youtube.com/@josiasabraao">YouTube Channel </a>
          and this is my <a href="https://github.com/JosiasBatista">Github</a>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>          
          ))}
        </ul>
      </section>
    </Layout>
  );
}
