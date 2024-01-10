// ItemSelector.js

import AvailableItems from "./AvailableItems";
import SelectedItems from "./SelectedItems";
import { SeparatorSvg } from "../../../../constants/svgs/Svg";
import useSelectedCoinbaseAction from "../../hooks/useSelectedCoinbaseAction";

const ItemSelector = ({
  thirdPartyCoinbaseActions,
  setThridPartyCoinbaseActions,
  handleTabClick,
}) => {
  useSelectedCoinbaseAction(thirdPartyCoinbaseActions);
  const handleDraggableItem = (selectedItem, event) => {
    // method to update url param with id of the selected action
    handleTabClick(selectedItem.id);

    /*
     implement logic to highlight content
    */

    // Check if Ctrl or Command key is pressed
    const isCtrlPressed = event.ctrlKey || event.metaKey;

    // Get the current draggable items
    const { draggable } = thirdPartyCoinbaseActions;

    // Create a new set based on the current draggable items
    const highlighted = new Set(draggable);

    if (isCtrlPressed) {
      // If Ctrl key is pressed, toggle the selection of the clicked item
      highlighted.has(selectedItem)
        ? highlighted.delete(selectedItem)
        : highlighted.add(selectedItem);
    } else {
      // If neither Ctrl nor Shift key is pressed, select only the clicked item
      highlighted.clear();
      highlighted.add(selectedItem);
    }

    // Update the state with the new draggable items
    setThridPartyCoinbaseActions((prevItems) => ({
      ...prevItems,
      draggable: [...highlighted],
    }));
  };

  const handleMoveItemsBetweenSections = () => {
    const { draggable } = thirdPartyCoinbaseActions;
    if (Array.isArray(draggable) && draggable.length > 0) {
      const removeFromAvailable = draggable.filter((item) =>
        thirdPartyCoinbaseActions.available.includes(item)
      );
      const removeFromSelected = draggable.filter((item) =>
        thirdPartyCoinbaseActions.selected.includes(item)
      );

      setThridPartyCoinbaseActions((prevItems) => ({
        ...prevItems,
        available: [
          ...prevItems.available.filter((item) => !draggable.includes(item)),
          ...removeFromSelected,
        ],
        selected: [
          ...prevItems.selected.filter((item) => !draggable.includes(item)),
          ...removeFromAvailable,
        ],
        draggable: [],
      }));
    }
  };

  return (
    <div className="w-36">
      <AvailableItems
        items={thirdPartyCoinbaseActions.available}
        onSelectItem={handleDraggableItem}
        draggableItems={thirdPartyCoinbaseActions.draggable}
      />
      <div className="relative w-full flex flex-1 justify-center my-2.5 before:z-0 before:absolute before:top-1/2 before:left-0 before:w-12 before:h-0.5 before:bg-neutral-300 after:absolute after:top-1/2 after:right-0 after:w-12 after:h-0.5 after:bg-neutral-300">
        <button
          title="Hold down “Control”, or “Command” on a Mac, to select more than one. Use Shift to select all."
          onClick={handleMoveItemsBetweenSections}
          className="p-0.5 border rounded-full border-gray-400 hover:border-gray-950 focus:ring-blue-300 hover:bg-blue-600 animate-[bounce_1s_ease-in-out_4]"
        >
          <SeparatorSvg
            className={
              "z-10 w-4 h-4 text-neutral-600 hover:text-white hover:scale-110"
            }
          />
        </button>
      </div>
      <SelectedItems
        selectedItems={thirdPartyCoinbaseActions.selected}
        onRemoveItem={handleDraggableItem}
        draggableItems={thirdPartyCoinbaseActions.draggable}
      />
    </div>
  );
};

export default ItemSelector;
