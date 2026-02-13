import decrementIcon from "../assets/images/icon-decrement-quantity.svg"

export default function SubtractIcon({ onClick }) {
  return <button type="button" onClick={onClick} className="p-0.5 border border-white rounded-full aspect-square">
    <img src={decrementIcon} alt="" />
  </button>
}