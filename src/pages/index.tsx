import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Header } from "~/components/Header";

import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <main className="flex flex-col pl-20 pr-20">
      <Header />
      <Content />
    </main>
  )
}

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    }
  )

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    }
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id} className="text-lg">
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <hr className="border-solid border-1 border-black my-5" />
        <input type="text"
          placeholder="...new topics"
          className="w-full border-solid border-2 border-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }} />
      </div>
      {createTopic.error && <p>Something went wrong! {createTopic.error.message}</p>}
    </div>
  )
}