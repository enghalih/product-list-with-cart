import CarbonIcon from "../assets/images/icon-carbon-neutral.svg"
export default function CarbonInfo() {
  return (
    <div className="p-4 text-preset-4-bold flex justify-center items-center gap-2 bg-rose-50">
      <img src={CarbonIcon} alt="" />
      <p className="">
        This is a <b>carbon-neutral</b> delivery
      </p>
    </div>
  );
}