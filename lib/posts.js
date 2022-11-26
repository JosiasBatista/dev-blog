import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsRepoUrl = 'https://api.github.com/repos/JosiasBatista/blog-content/git/trees/main?recursive=1';
const postRawUrl = 'https://raw.githubusercontent.com/JosiasBatista/blog-content/main/';

export async function getSortedPostsFromGit() {
  const res = await fetch(postsRepoUrl)
  const filesJson = await res.json()

  const allPostsData = await Promise.all(
    filesJson.tree.map(async (postFileInfos) => {

      const postFile = await fetch(postRawUrl + postFileInfos.path);
      const postFileText = await postFile.text();
      const matterResult = matter(postFileText);
      
      const id = postFileInfos.path.replace(/\.md$/, '');

      return {
        id,
        ...matterResult.data,
      };
    })
  )

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getAllPostIds() {
  const res = await fetch(postsRepoUrl);
  const posts = await res.json();

  const postsIds = posts.tree.map((fileName) => {
    return {
      params: {
        id: fileName.path.replace(/\.md$/, ''),
      },
    };
  });

  return postsIds
}

export async function getPostData(id) {
  const postFileText = await (await fetch(postRawUrl + id + '.md')).text()

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(postFileText);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

