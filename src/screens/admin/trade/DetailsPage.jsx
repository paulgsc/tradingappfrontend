import React from "react";

function DetailsPage() {
  return (
    <div className="flex h-max w-full">
      <div className=" max-w-xs min-h-full flex flex-1 justify-center">
        <div className="w-10/12">
          <h3>Listings mode</h3>
          <button>Change mode</button>
        </div>
      </div>
      <div className="min-h-full flex flex-1 shadow-sm border border-neutral-200 rounded-sm">
        <div className="w-full">
          <div className="grid grid-cols-6 w-full border-b border-neutral-200">
            <div className=" col-span-2">
              <span>Type</span>
            </div>
            <div className="grid grid-rows-2 col-span-4">
              <span>One property only</span>
              <span>10 Images max</span>
            </div>
          </div>
          <div className="grid grid-cols-6 w-full border-b border-neutral-200">
            <div className=" col-span-2">
              <span>Status</span>
            </div>
            <div className="grid grid-rows-2 col-span-4">
              <span>1 Active property</span>
              <span>address: 1234 some address</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
