// @flow
import { DisplayObject, Graphics, interaction, Application } from 'pixi.js'

interface DisplayObjectUtility {
  hitTest(DisplayObject, DisplayObject): boolean
}

const Utility: DisplayObjectUtility = {
  hitTest: (r1: DisplayObject, r2: DisplayObject) : boolean => {
    return !(
      r2.getBounds().x > (r1.getBounds().x + r1.getBounds().width)  ||
      (r2.getBounds().x + r2.getBounds().width) < r1.getBounds().x  ||
      r2.getBounds().y > (r1.getBounds().y + r1.getBounds().height) ||
      (r2.getBounds().y + r2.getBounds().height) < r1.getBounds().y
    );
  }
}

export default Utility
