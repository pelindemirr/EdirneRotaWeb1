import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

interface SortableRouteItemProps {
  id: string;
  place: {
    id: number;
    name: string;
    [key: string]: any;
  };
  index: number;
  onRemove: (id: number) => void;
}

export const SortableRouteItem = ({
  id,
  place,
  index,
  onRemove,
}: SortableRouteItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200 p-2.5 hover:shadow-md transition-all duration-300 ${
        isDragging ? "ring-2 ring-red-400" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <span
          className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-1"
          tabIndex={0}
          aria-label="Sürükle ve sırala"
        >
          <GripVertical className="w-4 h-4" />
        </span>

        <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md">
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-lg">{place.icon}</span>
            <span className="text-gray-800 font-semibold text-sm">
              {place.name}
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
            {place.category}
          </span>
        </div>

        <button
          onClick={() => onRemove(place.id)}
          className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full transition-all opacity-0 group-hover:opacity-100"
          title="Rotadan çıkar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
