import CellCustom from './CellCustom';
import {TABLE_COLUMNS, EXPENSE_CATEGORY} from '../constants/commonConstants'

function Row({
  data,
  expenseCode,
}) {

  const tableStatistics = TABLE_COLUMNS;
  return (
    <>
      <div className='row'>
        <div className="cell">
          <div className="expense-name">
            {EXPENSE_CATEGORY[expenseCode]}
          </div>
        </div>

        {tableStatistics.map((statistic) => (
          <CellCustom
            key={statistic}
            {...{data, statistic}}
          />
        ))}
      </div>
    </>
  );
}


export default Row;
