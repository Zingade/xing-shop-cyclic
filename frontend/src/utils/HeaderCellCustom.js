import {EXPENSE_DEFINITIONS} from '../constants/commonConstants'
import {capitalizeCustom} from '../utils/commonFunctions'

function StateHeaderCell({handleSort, sortData, setSortData, statistic}) {

  return (
    <div className="cell heading">
      <div>{capitalizeCustom(EXPENSE_DEFINITIONS[statistic].displayName)}</div>
    </div>
  );
}


export default StateHeaderCell;
