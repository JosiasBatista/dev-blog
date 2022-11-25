import utilStyles from '../styles/utils.module.css';

import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout>
      <h1 className={utilStyles.headingX}>Ops... we cannot found this page!</h1>
    </Layout>
  )
}