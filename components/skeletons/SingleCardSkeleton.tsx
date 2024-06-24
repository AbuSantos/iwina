"use client";
import React from "react";
import { Fredoka, Montserrat } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

const SingleCardSkeleton = () => {
    return (
        <div className="p-2 animate-pulse">
            <div className="w-full border border-gray-200 rounded-lg shadow">
                <div className="flex items-center justify-center bg-gray-200 h-32 rounded-t-lg"></div>

                <div className="p-2">
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4">
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>

                    <div className="flex items-center p-2 justify-between mt-4">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>

                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCardSkeleton;
