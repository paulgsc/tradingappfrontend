function FallingLeaves() {
  const leavesCount = 15;
  const delayFactors = [
    1.9, 3.9, 2.3, 4.4, 5, 3.5, 2.8, 1.5, 3.3, 2.5, 1.2, 4.1, 1, 4.7, 3,
  ];
  const getRandomScale = () => Math.random() * 0.15; // Random scale between 0.5 and 1
  const getRandomRotation = () => Math.random() * 360; // Random rotation between 0 and 360

  return (
    <div id="leaves" className="relative text-right z-0 pointer-events-none">
      {Array.from({ length: leavesCount }, (_, index) => (
        <i
          key={index}
          style={{
            WebkitAnimationDelay: `${delayFactors[index % leavesCount]}s`,
            transform: `scale(${getRandomScale()}) rotate(${getRandomRotation()}deg)`,
          }}
          className="animate-falling pointer-events-none after:pointer-events-none before:pointer-events-none inline-block w-[200px] h-[150px] skew-y-[20deg] rounded-sm rounded-bl-[55%] rounded-tr-[55%] rounded-br-[60%] shadow-xl shadow-green-950 bg-gradient-to-br from-[#309900] to-[#005600] relative after:absolute after:bottom-0 after:-translate-x-3 after:h-10 after:w-4 after:bg-gradient-to-br after:from-[#309900] after:to-[#005600] after:rotate-[490deg] before:absolute before:-top-4 before:left-0 before:skew-y-[-19deg] before:rotate-[50deg] before:translate-y-[4.6rem] before:w-[11.6rem] before:h-0.5 before:bg-gradient-to-r before:from-green-600 before:via-green-700 before:to-green-950"
        />
      ))}
    </div>
  );
}

export default FallingLeaves;
