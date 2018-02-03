//  TODO - TSB - rename and add specific details

import {MultiPlayerGame} from 'jtb-core-games-ui';

export class TSBGame extends MultiPlayerGame {
  constructor(original?: any) {
    super(original);
    Object.assign(this, original);
  }
}
