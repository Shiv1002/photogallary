import React, { Suspense } from 'react'
import Gallary from '@/app/components/Gallary'
import Loading from "@/app/components/Loading"
type Props = {
  params: {
    myParams: (string | undefined)[]
  }
}

export function generateMetadata({ params: { myParams } }: Props) {
  const term = myParams?.[0]
  const page = myParams?.[1]
  return {
    title: `Results for ${term} - page ${page}`
  }
}
export default function searchResult({ params: { myParams } }: Props) {
  const term = myParams?.[0]
  const page = myParams?.[1]
  return (
    <Suspense fallback={<Loading />}>
      <Gallary topic={term} page={page} />
    </Suspense>

  )
}
