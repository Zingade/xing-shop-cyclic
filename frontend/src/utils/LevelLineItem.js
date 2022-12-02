import './LevelCustom.scss';
import {formatNumberCustom} from '../utils/commonFunctions'

function LeveLineItem({inputText,amount, preamount}) {

    return (
      <div className="LevelLineItem">
        <h4>
          {inputText}{` ${formatNumberCustom(Math.floor(amount))}`} {(preamount)? `(${formatNumberCustom(preamount)})`: ''}
        </h4>
      </div>
    );
  }

export default LeveLineItem;