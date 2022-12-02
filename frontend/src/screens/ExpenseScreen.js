import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteExpense, listExpenses, saveExpense } from '../actions/expenseActions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {format} from 'date-fns';

function ExpenseScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [details, setDetails] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [card, setCardUsed] = useState(0);
    const [category, setCategory] = useState('');
    const [requiredType, setRequired] = useState('');
    const [orderFor, setOrderFor] = useState('');
    const [occurance, setOccurance] = useState('');
    const [frequency, setFrequency] = useState('');
    const [startExpenseFilterDate, setStartExpenseFilterDate] = useState(new Date("2020-01-01T11:00:00.000+00:00"));
    const [endExpenseFilterDate, setEndExpenseFilterDate] = useState(new Date());
    const [categoryFilter, setCategoryFilter] = useState('Regular Expenses');
    const [requiredTypeFilter, setRequiredFilter] = useState('Must');
    const [orderForFilter, setOrderForFilter] = useState('Family');
    const [occuranceFilter, setOccuranceFilter] = useState('Recursive');
    const [frequencyFilter, setFrequencyFilter] = useState('Monthly');
    const [isExpenseCategoryChecked, setExpenseCategoryIsChecked] = useState(false);
    const [isDateRangeChecked, setDateRangeIsChecked] = useState(false);
    const [isRequiredTypeChecked, setRequiredTypeIsChecked] = useState(false);
    const [isOrderForChecked, setOrderForIsChecked] = useState(false);
    const [isOccuranceTypeChecked, setOccuranceTypeIsChecked] = useState(false);
    const [isFrequencyChecked, setFrequencyIsChecked] = useState(false);
    const [isShowFilterChecked, setShowFilterIsChecked] = useState(false);

    const expenseList = useSelector(state=>state.expenseList);
    const {loading, expenses, error} = expenseList;
    const expenseSave = useSelector(state=>state.expenseSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = expenseSave;
    const expenseDelete = useSelector(state=>state.expenseDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = expenseDelete;
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listExpenses());
        return () =>{
        };
    }, [successSave,successDelete]);

    const openModal = (expense) => {
        setModalVisible(true);
        setId(expense._id);
        setDetails(expense.details);
        setAmount(expense.amount);
        setCardUsed(expense.card);
        setExpenseDate(expense.expenseDate);
        setCategory(expense.category);
        setRequired(expense.requiredType);
        setOrderFor((expense.orderFor)?expense.orderFor:"Family");
        setOccurance(expense.occurance);
        setFrequency(expense.frequency);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveExpense({_id:id, details, amount, expenseDate, card, category, requiredType, orderFor, occurance, frequency}));
    }

    const deleteHandler = (expenseId) => {
        dispatch(deleteExpense(expenseId));
    }

    const filterHandler = () => {
        let pCategory='', pOccurance='', pFrequency='', pRequiredType='', pOrderFor='', pStartDate='', pEndDate='';
        if (isShowFilterChecked) {
            pCategory = (isExpenseCategoryChecked)?categoryFilter:'';
            pOccurance = (isOccuranceTypeChecked)?occuranceFilter:'';
            pFrequency = (isFrequencyChecked)?frequencyFilter:'';
            pRequiredType = (isRequiredTypeChecked)?requiredTypeFilter:'';
            pOrderFor = (isOrderForChecked)?orderForFilter:'';
            pStartDate = (isDateRangeChecked)?startExpenseFilterDate:'';
            pEndDate = (isDateRangeChecked)?endExpenseFilterDate:'';
        }
        dispatch(listExpenses(pCategory,pStartDate,pEndDate,pOccurance,pRequiredType,pOrderFor,pFrequency))
    }

    const handleOnChange = (e) => {
        switch(e.target.id) {
            case "expense_category":
                return setExpenseCategoryIsChecked(!isExpenseCategoryChecked)
            case "date_range":
                return setDateRangeIsChecked(!isDateRangeChecked)
            case "required_type":
                return setRequiredTypeIsChecked(!isRequiredTypeChecked)
            case "orderFor":
                return setOrderForIsChecked(!isOrderForChecked)
            case "occurance_type":
                return setOccuranceTypeIsChecked(!isOccuranceTypeChecked)
            case "frequency":
                return setFrequencyIsChecked(!isFrequencyChecked)
            case "show_filter":
                return setShowFilterIsChecked(!isShowFilterChecked)
        }
    }

    return  <div className="containt containt-margined"> 
    <div className="product-header">
        <h3>Expenses</h3>
        <button className="button primary" onClick ={()=>openModal({details:'',amount:'',card:'Zing Credit Card',expenseDate:new Date(),category:"Regular Expenses",requiredType:"Must",orderFor:"Family",occurance:"Recursive",frequency:"Monthly"})}>New Expense</button>
    </div>
    <hr/>
    <div className="filter-header">
        <label>Filtering</label>
        <input type="checkbox" id="show_filter" checked={isShowFilterChecked} onChange={handleOnChange}/>
        <label>Show</label>
    </div>
    {isShowFilterChecked && <> <div>
        <input type="checkbox" id="expense_category" checked={isExpenseCategoryChecked} onChange={handleOnChange}/>
        <label htmlFor="category"> 
            Expense Category :
        </label>
        <select className="filter-select" value={categoryFilter} name="cateogoryFilter" id="cateogoryFilter" onChange={(e)=>setCategoryFilter(e.target.value)}>
            <option value="Regular Expenses">Regular Expenses</option>
            <option value="Grocery">Grocery</option>
            <option value="One Time">One Time</option>
            <option value="Clothing">Clothing</option>
            <option value="Hotel">Hotel</option>
            <option value="Medical">Medical</option>
            <option value="Local Transport">Local Transport</option>
            <option value="Education">Education</option>
            <option value="Donation">Donation</option>
            <option value="Gift">Gift</option>
            <option value="Travel">Travel</option>
            <option value="Yearly">Yearly</option>
        </select>
    </div>
    <div>
        <input type="checkbox" id="date_range" checked={isDateRangeChecked} onChange={handleOnChange}/>
        <label htmlFor="category"> 
            Date Range :
        </label>
        <div className="filter-date-type">
            <label htmlFor="category"> 
                Start:
            </label>
            <DatePicker className="filter-datepicker" minDate={new Date("01-01-2020")} maxDate={new Date()} selected={new Date(startExpenseFilterDate)} dateFormat="dd/MM/yyyy" onChange={date => setStartExpenseFilterDate(date)} />
        </div>
        <div className="filter-date-type">
        <label htmlFor="category"> 
                End :
            </label>
            <DatePicker className="filter-datepicker" minDate={new Date("01-01-2020")} maxDate={new Date()} selected={new Date(endExpenseFilterDate)} dateFormat="dd/MM/yyyy" onChange={date => setEndExpenseFilterDate(date)} />
        </div>
    </div>
    <div>
        <input type="checkbox" id="required_type" checked={isRequiredTypeChecked} onChange={handleOnChange}/>
        <label htmlFor="category"> 
            Required Type :
        </label>
        <select className="filter-select" value={requiredTypeFilter} name="requiredType" id="requiredType" onChange={(e)=>setRequiredFilter(e.target.value)}>
            <option value="Must">Must</option>
            <option value="Nice">Nice</option>
        </select>
    </div>
    <div>
        <input type="checkbox" id="orderFor" checked={isOrderForChecked} onChange={handleOnChange}/>
        <label htmlFor="category"> 
            Order For :
        </label>
        <select className="filter-select" value={orderForFilter} name="orderFor" id="orderFor" onChange={(e)=>setOrderForFilter(e.target.value)}>
        <option value="Family">Family</option>
            <option value="Zing">Zing</option>
            <option value="Pinky">Pinky</option>
            <option value="Saket">Saket</option>
            <option value="Stuti">Stuti</option>
        </select>
    </div>
    <div>
        <input type="checkbox" id="occurance_type" checked={isOccuranceTypeChecked} onChange={handleOnChange}/>
        <label htmlFor="category"> 
            Occurance Type :
        </label>
        <select className="filter-select" value={occuranceFilter} name="occurance" id="occurance" onChange={(e)=>setOccuranceFilter(e.target.value)}>
            <option value="Recursive">Recursive</option>
            <option value="One Time">One Time</option>
        </select>
    </div>
    <div>
        <input type="checkbox" id="frequency" checked={isFrequencyChecked} onChange={handleOnChange}/>
        <label htmlFor="category"> 
            Frequency :
        </label>
        <select className="filter-select" value={frequencyFilter} name="frequency" id="frequency" onChange={(e)=>setFrequencyFilter(e.target.value)}>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
        </select>
    </div>
    <div>
        <button className="button primary" onClick ={()=>filterHandler()}>Filter</button>
    </div>
    </>
    }
    <hr/>
    {modalVisible && 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>New Expense</h2>
                </li>
                <li>
                    {(loadingSave||loading)&&<div>Loading...</div>}
                    {error&&<div>{error}</div>}
                    {errorSave&&<div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="details"> 
                    Expense Details:
                    </label>
                    <input type="text" value={details} name="details" id="details" onChange={(e)=>setDetails(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="amount"> 
                    Amount:
                    </label>
                    <input type="text" value={amount} name="amount" id="amount" onChange={(e)=>setAmount(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="expense_date"> 
                    Expense Date:
                    </label>
                    <DatePicker selected={new Date(expenseDate)} dateFormat="dd/MM/yyyy" onChange={date => setExpenseDate(date)} />
                </li>
                <li>
                    <label htmlFor="card-used"> 
                    Card Used:
                    </label>
                    <select value={card} name="card" id="card" onChange={(e)=>setCardUsed(e.target.value)}>
                        <option value="Zing Credit Card">Zing Credit Card</option>
                        <option value="Zing HDFC Dabit Card">Zing HDFC Dabit Card</option>
                        <option value="Zing Current Account">Zing Current Account</option>
                        <option  value="Zing IDFC Debit Card">Zing IDFC Debit Card</option>
                        <option  value="Pinky Canara Debit Card">Pinky Canara Debit Card</option>
                        <option value="Pinky HDFC Debit Card">Pinky HDFC Debit Card</option>
                        <option value="Saket HDFC Debit Card">Saket HDFC Debit Card</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="category"> 
                    Expense Category:
                    </label>
                    <select value={category} name="cateogory" id="cateogory" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="Regular Expenses">Regular Expenses</option>
                        <option value="Grocery">Grocery</option>
                        <option value="One Time">One Time</option>
                        <option  value="Clothing">Clothing</option>
                        <option  value="Hotel">Hotel</option>
                        <option value="Medical">Medical</option>
                        <option value="Local Transport">Local Transport</option>
                        <option value="Education">Education</option>
                        <option value="Donation">Donation</option>
                        <option value="Gift">Gift</option>
                        <option value="Travel">Travel</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="required"> 
                    Require Type:
                    </label>
                    <select value={requiredType} name="requiredType" id="requiredType" onChange={(e)=>setRequired(e.target.value)}>
                        <option value="Must">Must</option>
                        <option value="Nice">Nice</option>
                    </select>
                </li>
                <li>
                <label htmlFor="orderFor"> 
                    Order For:
                    </label>
                    <select value={orderFor} name="orderFor" id="orderFor" onChange={(e)=>setOrderFor(e.target.value)}>
                        <option value="Family">Family</option>
                        <option value="Zing">Zing</option>
                        <option value="Pinky">Pinky</option>
                        <option value="Saket">Saket</option>
                        <option value="Stuti">Stuti</option>
                    </select>
                </li>
                <li>
                <label htmlFor="occurance"> 
                    Occurance Type:
                    </label>
                    <select value={occurance} name="occurance" id="occurance" onChange={(e)=>setOccurance(e.target.value)}>
                        <option value="Recursive">Recursive</option>
                        <option value="One Time">One Time</option>
                    </select>
                </li>
                <li>
                <label htmlFor="frequency"> 
                    Frequency:
                    </label>
                    <select value={frequency} name="frequency" id="frequency" onChange={(e)=>setFrequency(e.target.value)}>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?"Update":"Create"}</button>
                </li>
                <li>
                    <button type="submit" onClick = {()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
    </div>
    }
    <div>
        <table>
            <thead>
                <tr>
                    <th>Sl no</th>
                    <th>Expense Details</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                    <th>Card Used</th>
                    <th>Cateogory</th>
                    <th>Required Type</th>
                    <th>Order For</th>
                    <th>Occurance Type</th>
                    <th>Frequency</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {expenses.map((expense,count) => (
              <tr key={expense._id}>
                <td>{count+1}</td>
                <td>{expense.details}</td>
                <td>{expense.amount}</td>
                <td>{format(new Date(expense.expenseDate),"dd/MMM/yyyy")}</td>
                <td>{expense.card}</td>
                <td>{expense.category}</td>
                <td>{expense.requiredType}</td>
                <td>{expense.orderFor}</td>
                <td>{expense.occurance}</td>
                <td>{expense.frequency}</td>
                <td>
                  <button onClick={()=>openModal(expense)} className="button">
                    Edit
                  </button>{' '}
                  <button onClick={()=>deleteHandler(expense._id)} className="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
    </div>
}

export default ExpenseScreen;