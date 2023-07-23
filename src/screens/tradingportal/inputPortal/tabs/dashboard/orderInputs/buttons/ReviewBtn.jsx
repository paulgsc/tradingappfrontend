import React from 'react'

function ReviewBtn() {
  return (
    <div className="flex items-center justify-center w-full mx-auto my-auto py-6">
    <button className=" h-12 w-24 shadow-sm rounded-md text-white bg-black enabled:hover:bg-blue-600 disabled:opacity-40 enabled:cursor-pointer disabled:cursor-not-allowed">
      Review
    </button>
  </div>
  )
}

export default ReviewBtn
