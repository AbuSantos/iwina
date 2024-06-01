"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import clean from "@/public/images/clean.svg"
import wash from "@/public/images/wash.svg"
import food from "@/public/images/food.svg"
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
  mode: string,
  onOpen?: () => void
}
const SingleCard = ({ description, deadline, points, status, pickedBy, createdAt, onOpen, mode }: TaskType) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectImage, setSelectedImage] = useState()
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (description.includes("wash") || description.includes("plate") || description.includes("clean")) {
      setSelectedImage(wash);
    } else if (description.includes("room") || description.includes("dress") || description.includes("bed")) {
      setSelectedImage(clean);
    } else if (description.includes("food") || description.includes("fridge") || description.includes("Defrost") || description.includes("warm") || description.includes("cook")) {
      setSelectedImage(food);
    }
  }, [description]);


  return (
    <div className='p-2'>
      <div className={`${mode === "feed" ? "w-[12rem] border border-gray-200 rounded-lg shadow" : "w-full"}  `}>
        <div className='flex items-center justify-center '>
          <Image
            className=" rounded-t-lg"
            src={selectImage || clean}
            alt="product image"
            width={250}
            height={50}
          />
        </div>

        <div className="p-2">
          <div>
            {
              mode === "feed" ? <div className=''>
                <p className={`text-[1rem] tracking-tight text-gray-700 ${montserrat.className}`}>
                  {description ? (
                    isExpanded ? description : `${description.slice(0, 50)}${description.length > 50 ? ' ...' : ''}`
                  ) : (
                    'No description available.'
                  )}
                </p>

                {
                  description && description.length > 50 && (
                    <button onClick={toggleExpanded} className="text-blue-500 text-sm ">
                      {isExpanded ? "view less" : "view more"}
                    </button>
                  )
                }
              </div> :
                <p className={`text-[1rem] tracking-tight text-gray-700 ${montserrat.className}`}>
                  {description}
                </p>
            }
          </div>


          <div className="flex items-center p-2 justify-between ">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4  text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className={`text-xl font-medium text-gray-900 ${fredoka.className}`}>{points}</span>
            </div>

            <p className={`text-[0.7rem] text-gray-900 ${fredoka.className}`}>
              {formatTime(deadline)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            {
              mode === "feed" && <button onClick={onOpen} className=' px-3 py-2 rounded-lg text-sm bg-[#6229b3] text-[#fdfcff] font-medium '>
                view task
              </button>
            }

            <span className={`text-[0.7rem] text-gray-700 ${fredoka.className}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCard