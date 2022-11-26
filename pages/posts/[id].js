import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css';

import Layout from '../../components/layout';
import Date from '../../components/date';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  
  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Post({ postData }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingX}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
