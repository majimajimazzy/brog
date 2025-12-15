import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';


export default async function Blogs() {
  // contentディレクトリ内のマークダウンファイル一覧を取得
  const postsDirectory = path.join(process.cwd(), 'content');
  const fileNames = fs.readdirSync(postsDirectory);

  // 各ファイルの中身を取得
  const posts = await Promise.all(
    // 各ファイル情報を取得
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      // slugとfrontmatter(title, date, description)を取得
      return {
        slug: fileName.replace('.md', ''),
        frontmatter: data,
      };
    })
  ).then((posts) =>
    // 最新日付順に並び替え
    posts.sort((a, b) => Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date)))
  );
  console.log(posts);

  return (
    <div>
      <header className="sticky top-0 border-b z-10 bg-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
          <Link href="/">
            <div>mazzy's blog</div>
          </Link>
        </div>
      </header>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="sticky text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">記事一覧</h2>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="group relative">
                    {/* 日付を表示 */}
                    <div className="flex items-center gap-x-4 text-xs">
                      <div className="text-gray-500">{post.frontmatter.date}</div>
                    </div>
                    {/* 記事タイトル・リンク */}
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-blue-700 group-hover:text-blue-400">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-3 text-lg font-semibold leading-6 text-blue-700 group-hover:text-blue-400"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    {/* 記事説明文を表示 */}
                    <p
                      className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: `${post.frontmatter.description}` }}
                    ></p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-100">
        <div className="max-w-4xl w-full mx-auto h-24 flex items-center justify-center">
          <div>© mazzy's blog</div>
        </div>
      </footer>
    </div>
  );
}