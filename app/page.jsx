"use client";
import Feed from "@components/Feed";
import { useEffect, useState } from "react";
function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt", {
        cache: "no-store",
      });
      const data = await response.json();
      setPosts(data);
    })();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptLib is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      <Feed posts={posts} />
    </section>
  );
}

export default Home;
