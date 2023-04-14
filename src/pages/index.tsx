import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SvgIcon } from "~/components/SvgIcon";

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
    <div
      className="group relative isolate flex h-post w-post flex-col justify-between overflow-hidden rounded-3xl border border-black/20 p-2 shadow-xl duration-300 focus-within:shadow-2xl hover:shadow-2xl"
      tabIndex={0}
    >
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
          className="aspect-square -translate-y-14 rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus:bg-white/80 focus:fill-slate-900 group-focus-within:translate-y-0 group-hover:translate-y-0"
        >
          <SvgIcon svgName="bookmark" />
        </button>
      </header>

      <nav className="absolute left-0 right-0 top-1/2 mx-2 flex -translate-y-1/2 justify-between">
        <button
          title="view previous image"
          name="view previous image"
          className="aspect-square -translate-x-10 rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus:bg-white/80 focus:fill-slate-900 group-focus-within:translate-x-0 group-hover:translate-x-0"
          onClick={viewPrevImage}
        >
          <SvgIcon svgName="leftArrow" />
        </button>
        <button
          title="view next image"
          name="view next image"
          className="aspect-square translate-x-10 rounded-full border border-black/20 bg-white/50 fill-slate-600 p-2 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus:bg-white/80 focus:fill-slate-900 group-focus-within:translate-x-0 group-hover:translate-x-0"
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
              className="aspect-square w-5 rounded-full border border-black/20 bg-white/50 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 aria-[current=true]:bg-white/80"
              onClick={() => gotToImage(i)}
            />
          ))}
        </nav>

        <div className="ml-auto translate-y-14 space-x-3 duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
          <button
            title="view comments"
            name="view comments"
            className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus:bg-white/80 focus:fill-slate-900"
          >
            <SvgIcon svgName="speech" />
          </button>
          <button
            title="like"
            name="like"
            className="aspect-square rounded-full border border-black/20 bg-white/50 p-2 backdrop-blur-md duration-300 hover:bg-white/80 hover:fill-slate-900 focus:bg-white/80 focus:fill-slate-900"
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
          <li key={i} className="relative h-post w-post">
            <Image
              priority={i === 0}
              aria-current={i === imageIndex}
              src={`/${src}`}
              alt="image"
              fill
              sizes="1000px"
              className="object-cover duration-300 group-focus-within:aria-[current=true]:scale-105 aria-[current=true]:group-hover:scale-105"
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

      <main className="mx-auto flex w-max flex-col justify-center gap-5 py-5">
        {[...Array<unknown>(5)].map((_, i) => (
          <Post key={i} images={images} />
        ))}
      </main>
    </>
  );
};

export default Home;
