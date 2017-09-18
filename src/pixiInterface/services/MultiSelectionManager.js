// @flow
import SelectionLayer from '../components/SelectionLayer.js'
import DisplayObject from 'pixi.js'

interface _selectableObject {
  getDisplay(): DisplayObject
}

let mainSelectionLayer: SelectionLayer = null;
const selectedObjects = []
const selectableObjects = []

const registerSelectionLayer = (_selectionLayer: SelectionLayer) => {
  mainSelectionLayer = _selectionLayer
}

const registerSelectableObject = (_selectableObject: DisplayObject) => {
  selectableObjects.push(_selectableObject)
}

export default {
  registerSelectionLayer: registerSelectionLayer,
  registerSelectableObject: registerSelectableObject,
}
