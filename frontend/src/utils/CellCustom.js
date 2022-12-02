import {formatNumberCustom} from '../utils/commonFunctions'
import {TABLE_COLUMNS,EXPENSE_DEFINITIONS} from '../constants/commonConstants'

const Cell = ({statistic, data}) => {

    const total = data.total[statistic];
    let delta = data.delta || 0;
    if(delta) {
      delta = data.delta[statistic];
    } 
    return (
      <div className="cell statistic">
          <div className={`delta is-${statistic}`}>
            {
              delta > 0
                ? '+' + formatNumberCustom(delta, 'int')
                : ''
            }
          </div>
  
        <div className="total">
          {
            formatNumberCustom(total, 'int', statistic)
          }
        </div>
      </div>
    );
  };
  
  
  export default Cell;
  