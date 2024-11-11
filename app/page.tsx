import Pagination from "./components/Pagination";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  let { page } = await searchParams;
  if (!page) page = '1'
  // return <div>Hello World</div>;
  return <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
}
