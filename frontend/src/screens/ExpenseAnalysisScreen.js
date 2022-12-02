import React, { Suspense, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listExpenses } from '../actions/expenseActions';
import Level from '../utils/LevelCustom'
import LevelLineItem from '../utils/LevelLineItem'
import TableCustom from '../utils/TableCustom'
import {expenseDetails,summaryExpense, monthlyExpenses} from '../constants/commonConstants'
import {analyisOfExpense, analyseMonthlyExpenses} from '../utils/commonFunctions'
import MonthlyExpenseChart from '../utils/MonthlyExpenseChart';


function ExpenseAnalysisScreen(props) {

  const expenseList = useSelector(state=>state.expenseList);
  const {loading, expenses, error} = expenseList;
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(listExpenses());
    return () =>{
    };
  }, []);
  
      return ( 
      <>   
      {(loading) ? (
      <div>Loading...</div>
    ) : (error) ? (
      <div>{(error)}</div>
    ) : (
      <>
      <div style={{position: 'relative', marginTop: '1rem'}}> 
      {analyisOfExpense(expenses)}
        <LevelLineItem inputText={"Current Month Expenses :"} amount={summaryExpense.current} preamount={summaryExpense.previousMonth}/>
        <Level data={summaryExpense}/>
        <LevelLineItem inputText={"Available Balance :"} amount={summaryExpense.availableBalance}/>
      </div>
        <div className="Home1">
          <div className='home-left'>
              <Suspense fallback={<div />}>
              <TableCustom
                  {...{
                    data:expenseDetails,
                  }}
                />
              </Suspense>
        </div>
      </div>
        <LevelLineItem inputText={"Current Month Expenses :"} amount={summaryExpense.current}/>
        {analyseMonthlyExpenses(expenses)}
        <MonthlyExpenseChart data={monthlyExpenses}/>
      </>
  )}
    </>   
  )
}
export default ExpenseAnalysisScreen;