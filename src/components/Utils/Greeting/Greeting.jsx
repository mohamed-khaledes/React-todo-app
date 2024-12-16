import GreetingHook from "./hook";

const Greeting = () => {
  const {today,greeting} = GreetingHook()

  return (
    <div className="py-7 px-10 max-sm:px-2 max-sm:py-3">
      <div className=" max-w-[1300px] max-lg:container flex justify-between items-center">
        <h1 className=" text-white font-bold flex items-center gap-1 text-3xl max-sm:text-lg"><span className="max-sm:text-3xl">&#128075;</span>{greeting}</h1>

        <div>
          <p className=" text-white font-semibold text-lg max-sm:text-sm">{today}</p>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
