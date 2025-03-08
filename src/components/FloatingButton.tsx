import { FC, MouseEventHandler } from "react";

interface IFloatingButton {
  label: string;
  badge: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FloatingButton: FC<IFloatingButton> = ({ badge, label, onClick }) => {
  return (
    <div className="fixed top-20 right-5">
      <button
        className="relative bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={onClick}
      >
        {label || "No Label"}
        {badge > 0 && (
          <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingButton;
