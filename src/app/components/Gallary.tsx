
import { Photo, ImagesResults } from "@/models/Images";
import { fetchImages } from "@/lib/fetchImages";
import ImageContainer from "../ImageContainer";
import getbase64 from "@/lib/getbase64Images";
import Link from "next/link";
import Loading from "./Loading"
type Props = {
  topic?: String | undefined,
  page?: String | undefined
}


export default async function Gallary({ topic = 'curated', page }: Props) {
  let url;
  if (topic === 'curated' && page) {
    url = `https://api.pexels.com/v1/curated?page=${page}`
  } else if (topic === "curated") {
    url = `https://api.pexels.com/v1/curated/`
  } else if (topic !== "curated" && !page) {
    url = `https://api.pexels.com/v1/search?query=${topic}`
  } else {
    url = `https://api.pexels.com/v1/search?page=${page}&query=${topic}`
  }



  const images: ImagesResults | undefined = await fetchImages(url)

  if (!images || !images.total_results) return <div className="h-16 text-center font-bold text-3xl">No images found!</div>

  const photosWithBlurr = await getbase64(images)

  if (!photosWithBlurr) return <div className="h-16 text-center font-bold text-3xl">No images found!</div>

  // pagination
  // total pages = total_results / 15
  if (!page)
    page = "2"
  else {
    page = (Math.min(photosWithBlurr.total_results / 15 + 1, Number(page) + 1)).toString()
  }



  return <>
    <div className="relative p-3 mx-auto grid place-items-center grid-cols-[repeat(auto-fill,minmax(250px,1fr))] auto-row-[10px] gap-2">
      {photosWithBlurr.photos.map(photo =>

        <ImageContainer key={photo.id} photo={photo} />)}
    </div>
    <div className="mx-auto flex p-4 w-full justify-center">
      {

        photosWithBlurr.prev_page ?
          <div className="font-semibold text-lg mx-2">
            <Link href={`/results/${topic}/${Number(page) - 1}`}> &lt;&lt;&lt;prev </Link>
          </div>

          : ""
      }

      {
        photosWithBlurr.next_page ?
          <div className="font-semibold text-lg mx-2">
            <Link href={`/results/${topic}/${page}`}> next &gt;&gt;&gt;</Link>
          </div>
          : ""
      }

    </div>
  </>
}
