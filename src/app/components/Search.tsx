'use client'

import React, { FormEvent, useRef, useState, useEffect } from 'react'
import { searchHistory, searchHistorySchema } from '@/models/Search'
import { useRouter } from 'next/navigation'
import { setTimeout } from 'timers'
import Trash from "./Icons/Trash"

export default function Search() {

  const [search, setSearch] = useState('')
  const searchInput = useRef(null)
  const [history, setHistory] = useState<searchHistory | undefined>(undefined)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    // loads only once
    if (!localStorage.getItem('photo-gallary')) {
      console.log('No photo gallary')
      localStorage.setItem('photo-gallary', JSON.stringify([]))
    }

    // turning localstore string item into json object then validating it
    const his = searchHistorySchema.parse(JSON.parse(localStorage.getItem('photo-gallary') || ""))
    // adding search history to state
    setHistory(() => his)
    console.log(history)
  }, [])

  useEffect(() => {
    if (!history) return
    console.log('update  history', history)
    if (history != JSON.parse(localStorage.getItem('photo-gallary') || ""))
      localStorage.setItem("photo-gallary", JSON.stringify(history))

  }, [history])


  const pushToHistory = (new_search: string) => {

    const filtered = history?.filter((s, i) => s.term === new_search)

    if (filtered?.length) {

      console.log("update the frequency of searched one")
      const newHis = history?.map(s => { if (s.term === new_search) s.frequency += 1; return s })
      setHistory(newHis)
    } else {
      console.log("adding new term")
      if (history)
        setHistory([...history, { term: new_search, frequency: 1 }])
    }

  }

  const removeSearch = (term: string) => {
    console.log(term)
    setHistory(() => history?.filter((s, i) => term !== s.term))
  }

  const router = useRouter()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(search)
    pushToHistory(search)
    router.push(`/results/${search}`)
    setShowSearch(false)
    setSearch('')
  }

  return (
    <div className='flex flex-col'>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={searchInput}
          type="text"
          placeholder='search'
          className='outline-none px-4 py-2 rounded-2xl text-lg'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onFocus={() => {
            setShowSearch(true)
          }}
          onBlur={() => {
            // setting time out so search item can be selected before showsearch is toggled
            setTimeout(() => {
              setShowSearch(false)
            }, 150);
          }}
        />
      </form>
      <div className='relative'>
        {
          showSearch ?
            <div className='absolute my-2 px-2  text-black bg-white w-full rounded-2xl  z-50'>
              <ul className='list-none font-normal text-base  '>
                {history?.sort((a, b) => b.frequency - a.frequency).map((s, i) =>
                  <div
                    key={i}
                    className='flex border-b-2 border-cyan-100 w-full relative'>

                    <button
                      className='flex-grow p-2 '
                      onClick={() => {
                        // alert('search')
                        console.log(`going to ${s.term}`)
                        router.push(`/results/${s.term}`)
                        pushToHistory(s.term)
                      }}>

                      <span>{s.term}</span>

                    </button>

                    <button className='p-5 ' onClick={() => removeSearch(s.term)} title='remove from history'><Trash /></button>

                  </div>


                )}
              </ul>

            </div> : ""
        }
      </div>

    </div>

  )
}
