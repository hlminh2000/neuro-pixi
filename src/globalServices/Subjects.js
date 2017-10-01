import { Subject } from 'rxjs/Rx';

export default {
  $_multiSelectableObjects: new Subject(),
  $_selectionArea: new Subject(),
  $_draggableObjectLocation: new Subject(),
  $_selectedObjectLocation: new Subject(),
  $_pixiAppCanvasDimention: new Subject(),
}
