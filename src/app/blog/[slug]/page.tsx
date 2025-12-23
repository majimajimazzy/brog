import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import './content.css';
import Link from 'next/link';
import append from '@/lib/append';
import Image from 'next/image';

// ブログ記事ページ
export default async function BlogPost({ params } : {params:Promise<{slug : string}>}) {
  // URLのパラメータから該当するファイル名を取得 (今回は hello-world)
  const { slug } = await params.then((data: {slug: string})=>{
    return data;
  })
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
  // ファイルの中身を取得
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const title = data.title; // 記事のタイトル
  const date = data.date;
  const processedContent = await unified().use(remarkParse).use(remarkHtml).process(content);
  const contentHtml = processedContent.toString(); // 記事の本文をHTMLに変換
  const string_box = content;
  const want = append(string_box);//本文の100文字を取得
  console.log(want);
  const pict = data.thumbnail;
  return (
    <div>
      <header className="sticky top-0 border-b z-10 bg-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
          <Link href="/">
            <div>mazzy's blog</div>
          </Link>
        </div>
      </header>
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            {pict && (
              <div className="relative w-full h-64 mb-6">
                <Image
                  src={pict}
                  alt={title}
                  fill
                  sizes='w-auto w-auto'
                  className="object-cover rounded-lg w-auto h-auto"
                />
              </div>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <div>
            {date}
          </div>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          >
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