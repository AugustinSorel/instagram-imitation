import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SvgIcon } from "~/components/SvgIcon";

const SkeletonPost = () => {
  return (
    <div className="relative flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 bg-white/20 p-2 shadow-2xl backdrop-blur-md after:absolute after:bottom-0 after:left-0 after:top-0 after:w-32 after:rotate-[20deg] after:scale-150 after:animate-post-skeleton after:bg-black/10 after:blur-xl">
      <header className="grid grid-cols-[auto_1fr] gap-1 p-1">
        <div className="row-span-2 my-auto aspect-square w-7 rounded-full bg-black/10" />
        <div className="h-3 w-20 self-end rounded-full bg-black/10" />
        <div className="h-2 w-14 rounded-full bg-black/10" />
      </header>

      <div className="mb-3 flex items-center justify-center gap-3">
        {[...Array<unknown>(3)].map((_, i) => (
          <div key={i} className="aspect-square w-5 rounded-full bg-black/10" />
        ))}
      </div>
    </div>
  );
};

const Post = ({ images }: { images: string[] }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const viewNextImage = () => {
    setImageIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
  };

  const viewPrevImage = () => {
    setImageIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
  };

  const gotToImage = (index: number) => {
    if (index < 0 || index > images.length - 1) {
      return;
    }

    setImageIndex(index);
  };

  return (
    <div className="group relative isolate flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 p-2 shadow-xl duration-300 hover:shadow-2xl">
      <header className="flex items-center justify-between">
        <div className="grid w-32 grid-cols-[auto_1fr] gap-x-1 rounded-full border border-black/10 bg-white/50 p-1 backdrop-blur-md">
          <div className="row-span-2 my-auto aspect-square w-7 rounded-full bg-green-400" />
          <h2 className="self-end truncate text-[0.7rem] font-medium capitalize leading-3">
            jhon
          </h2>
          <p className="truncate text-[0.6rem] capitalize leading-3">
            Seatle, USA
          </p>
        </div>

        <button
          title="bookmark this post"
          name="bookmark this post"
          className="aspect-square rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <SvgIcon svgName="bookmark" />
        </button>
      </header>

      <nav className="absolute left-0 right-0 top-1/2 mx-2 flex -translate-y-1/2 justify-between">
        <button
          title="view previous image"
          name="view previous image"
          className="aspect-square rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
          onClick={viewPrevImage}
        >
          <SvgIcon svgName="leftArrow" />
        </button>
        <button
          title="view next image"
          name="view next image"
          className="aspect-square rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
          onClick={viewNextImage}
        >
          <SvgIcon svgName="rightArrow" />
        </button>
      </nav>

      <footer className="grid grid-cols-[1fr_auto_1fr] items-center fill-slate-600">
        <nav className="col-start-2 flex items-center gap-3">
          {[...Array<unknown>(images.length)].map((_, i) => (
            <button
              key={i}
              aria-current={i === imageIndex}
              name={`view post ${i + 1}`}
              title={`view post ${i + 1}`}
              className="aspect-square w-5 rounded-full border border-black/20 bg-white/50 backdrop-blur-md duration-300 hover:bg-white/80 focus-visible:bg-white/80 aria-[current=true]:bg-white/80"
              onClick={() => gotToImage(i)}
            />
          ))}
        </nav>

        <div className="ml-auto space-x-3 ">
          <button
            title="view comments"
            name="view comments"
            className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <SvgIcon svgName="speech" />
          </button>
          <button
            title="like"
            name="like"
            className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 opacity-0 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus-visible:bg-white/80 focus-visible:fill-slate-900 focus-visible:opacity-100 group-hover:opacity-100"
          >
            <SvgIcon svgName="heart" />
          </button>
        </div>
      </footer>

      <ul
        className="absolute inset-0 -z-10 flex w-max duration-300"
        style={{ translate: `${350 * imageIndex * -1}px 0` }}
      >
        {images.map((src, i) => (
          <li
            key={i}
            aria-current={i === imageIndex}
            className="h-post w-post duration-300 aria-[current=true]:group-hover:scale-105"
          >
            <Image
              priority={i === 0}
              src={`/${src}`}
              alt="image"
              height={2000}
              width={2000}
              className="h-post w-post object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home: NextPage = () => {
  const images = ["a.jpg", "b.jpg", "c.jpg"];

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex flex-col items-center justify-center gap-5 py-5">
        {[...Array<unknown>(5)].map((_, i) => (
          <Post key={i} images={images} />
        ))}

        {[...Array<unknown>(5)].map((_, i) => (
          <SkeletonPost key={i} />
        ))}
      </main>
    </>
  );
};

export default Home;
