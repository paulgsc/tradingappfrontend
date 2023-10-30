function ProfileCard({ userData }) {
  const username = userData?.first_name
    ? `${userData?.first_name} ${userData?.last_name}`
    : "Anonymous Platypus";
  return (
    <div className="flex flex-col justify-center max-w-fit bg-transparent">
      <img
        src="https://source.unsplash.com/150x150/?portrait?3"
        alt=""
        className="w-20 h-20 mx-auto rounded-full dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700 ">
        <div className="my-2 space-y-1">
          <h2 className="text-sm font-semibold ">{username}</h2>
          <p className="px-5 text-xs ">{userData?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
