"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import clean from "@/public/images/clean.svg"
import wash from "@/public/images/wash.svg"
import { formatTime } from '@/lib/FormatTime'
import { Fredoka, Montserrat } from 'next/font/google'
const fredoka = Fredoka({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })

type TaskType = {
  description?: String,
  deadline: Date,
  points?: number,
  status?: String,
  pickedBy?: String,
  createdAt?: Date,
  onOpen: () => void
}
const newDezcription = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Consectetur a aliquid hic nemo assumenda rem iste recusandae magnam voluptate, blanditiis doloremque rerum enim, quod aperiam numquam quidem corporis nam vero velit dolorum?Praesentium mollitia ad nisi blanditiis! Ad, veritatis porro."
const SingleCard = ({ description, deadline, points, status, pickedBy, createdAt, onOpen }: TaskType) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className='p-2'>
      <div className="w-64 border border-gray-200 rounded-lg shadow p-2">
        <div>
          <Image
            className=" rounded-t-lg"
            src={wash}
            alt="product image"
            width={300}
            height={50}
          />
        </div>

        <div className="p-2">
          <div className='flex justify-between'>
            <p className={`text-lg tracking-tight text-gray-900 `}>
              {
                isExpanded ? newDezcription : `${newDezcription.slice(0, 50)}...`
              }

              {/* {description}*/}
            </p>
            {
              newDezcription && newDezcription.length > 50 && (
                <button onClick={toggleExpanded} className="text-blue-500 text-sm">

                  {isExpanded ? "view less" : "view more"}
                </button>
              )
            }
          </div>

          <div className="flex items-center mt-2.5 mb-5 justify-between">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4  text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className={`text-xl font-medium text-gray-900 ${fredoka.className}`}>{points}</span>
            </div>

            <p className={`text-[0.5rem]text-gray-900 ${fredoka.className}`}>
              {formatTime(deadline)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={onOpen} className=' px-5 py-2 rounded-xl text-sm bg-[#6229b3] text-[#fdfcff] -font-medium '>
              view task
            </button>
            <span className={`text-[0.5rem]text-gray-900 ${fredoka.className}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCard