
let selectionLayer = null;
const selectedObjects = []
const selectableObjects = []

const registerSelectionLayer = (_selectionLayer) => {
  selectionLayer = _selectionLayer
}

const registerSelectableObject = (_selectableObject) => {
  selectableObjects.push(_selectableObject)
}

export default {
  registerSelectionLayer: registerSelectionLayer,
  registerSelectableObject: registerSelectableObject,
}
