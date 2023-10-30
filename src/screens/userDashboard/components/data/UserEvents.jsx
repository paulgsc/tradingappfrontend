import TimeLines from "../ui/TimeLines";

function UserEvents() {
  return (
    <>
      {Array(5)
        .fill()
        .map((item, i) => (
          <TimeLines key={i} timeline={i} />
        ))}
    </>
  );
}

export default UserEvents;
