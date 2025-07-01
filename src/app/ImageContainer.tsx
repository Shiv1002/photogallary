import React from 'react'
import Image from 'next/image'
import { Photo } from '@/models/Images'
import Link from 'next/link'

type Props = {
  photo: Photo
}

export default function ImageContainer({ photo }: Props) {
  const wid_height_ratio = photo.height / photo.width
  const gallary_height = Math.ceil(250 * wid_height_ratio)
  const photoSpans = Math.ceil(gallary_height / 10) + 1
  return (
    <>
      {!photo.src.blurr ? (
        <></>
      ) : (
        <div
          className="sm:w-[250px] w-full"
          style={{
            gridRow: `span ${photoSpans}`,
          }}
        >
          <Link href={photo.url} target="_blank">
            <div className="rounded-xl bg-slate-200 relative overflow-hidden">
              <Image
                className="hover:scale-105 hover:opacity-80 transition-opacity min-h-48"
                width={photo.width}
                height={gallary_height}
                src={photo.src.large}
                blurDataURL={photo.src.blurr}
                alt={photo.alt}
                title={photo.alt}
                placeholder="blur"
              />
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
