import incrementIcon from "../assets/images/icon-increment-quantity.svg"

export default function AddIcon({ onClick}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-0.5 border border-white rounded-full aspect-square"
    >
      <img
        src={incrementIcon}
        alt=""
      />
    </button>
  );
}