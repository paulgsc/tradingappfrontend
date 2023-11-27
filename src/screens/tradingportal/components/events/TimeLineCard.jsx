import DatePicker from "../../../../components/ui/date-picker/DatePicker";
import EventsMetaCard from "./EventsMetaCard";
import TimeLine from "./TimeLine";

function TimeLineCard() {
  return (
    <div className="space-y-6">
      <div className=" relative px-4 space-y-2 after:absolute after:-z-10 after:inset-0 after:shrink-0 after:bg-gradient-to-tr after:from-blue-100 after:via-zinc-100 ">
        <i className=" -z-10 animate-wiggle pointer-events-none after:pointer-events-none before:pointer-events-none inline-block w-[200px] h-[150px] skew-y-[20deg] rounded-sm rounded-bl-[55%] rounded-tr-[55%] rounded-br-[60%] shadow-xl shadow-green-950 bg-gradient-to-br from-[#309900] to-[#005600] opacity-80 absolute top-[36px] right-[28px] after:absolute after:bottom-1 after:-right-2 after:h-10 after:w-4 after:bg-gradient-to-br after:from-[#309900] after:to-[#005600] after:rotate-[486deg] before:absolute before:-top-4 before:left-0 before:skew-y-[-19deg] before:rotate-[50deg] before:translate-y-[4.6rem] before:w-[11.6rem] before:h-0.5 before:bg-gradient-to-r before:from-green-600 before:via-green-700 before:to-green-950" />
        <h1 className="md:text-xl font-bold leading-8 ">Transactions Log</h1>
        <h3 className="md:text-lg font-medium leading-6">
          Transparent view of all related property events
        </h3>
        <p className="w-full max-w-md">
          View timeline log of all important events to help you better
          understand your investment. Subscribe to notifications to get notified
          as soon as a a new activity is added.
        </p>
        <h3>View all important events such as</h3>
        <EventsMetaCard />
      </div>
      <div>
        <DatePicker />
        <TimeLine />
      </div>
    </div>
  );
}

export default TimeLineCard;
