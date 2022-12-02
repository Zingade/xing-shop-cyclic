import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteMutualFund, listMutualFunds, saveMutualFund } from '../actions/mutualFundActions';
import "react-datepicker/dist/react-datepicker.css";
import {FundCard, AssetCard} from '../utils/MutualFundCards'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useForm } from '../utils/useForm';
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles({
        newButton:{
            position:"flex",
            borderRadius:"20px",
            fontSize:15,
            textTransform: "none",
        },
        dialog:{
            position: 'absolute',
            top: 10,
        },
        dialogButton:{
            textTransform: "none",
            margin:"10px 5px"
        },
        textField:{
            margin:"5px 0"
        },
})

const initialFValues = {
    id:0,
    name:'',
    amount:0,
    mutualFundDate: new Date(),
    apiLink:'',
    units:0,
}

function MutualFundScreen(props) {
    const classes = useStyles() 
    const [open, setOpen] = useState(false);
    const [mfDate,setMFDate] = useState(new Date())

    const mutualFundList = useSelector(state=>state.mutualFundList);
    const {loading, mutualFunds, error} = mutualFundList;
    const mutualFundSave = useSelector(state=>state.mutualFundSave);
    const {success: successSave} = mutualFundSave;
    const dispatch = useDispatch();

    const openDialog = (mutualFund) => {
        values.id = mutualFund.id;
        values.name = mutualFund.name;
        values.amount = mutualFund.amount;
        values.mutualFundDate = mutualFund.mutualFundDate;
        values.apiLink = mutualFund.apiLink;
        values.units = mutualFund.units;
        setMFDate(values.mutualFundDate)
        setErrors({})
        setOpen(true)
    }

    useEffect(()=>{
        dispatch(listMutualFunds());
        return () =>{
        };
    }, [successSave]);

    const {
        values, 
        handleInputChange, 
        errors, 
        setErrors
    } = useForm(initialFValues);

    const validate = () =>{
        let temp = {}
        temp.name = values.name?"":"Mutualfund name field is required"
        temp.amount = values.amount?"":"Amount field is required"
        temp.apiLink = values.apiLink?"":"API Link field is required"
        temp.units = values.units?"":"Units field is required"
        setErrors({
          ...temp
        })
        return Object.values(temp).every(x => x === "");
      }
    
    const handleClose = () => {
        setOpen(false);
      };
    
    const handleSubmit = () => {
        if(validate()){
            dispatch(saveMutualFund({_id:values.id, name:values.name, amount:values.amount, mutualFundDate:mfDate, apiLink:values.apiLink, units:values.units}));
            setOpen(false);
        }
    };
    
    const handleAddNew = () => {
        openDialog({id:0, name: '', amount:0, apiLink:'', mutualFundDate:new Date(), units:0})
    }

    return (  
    <>
        {loading?<div>Loading.....</div>:
        error?<div>{error}</div>:(
            <>
                <Grid container justify="center" style={{display:"flex"}}>
                    <AssetCard data={{curValue:mutualFunds.actualValue, invValue:mutualFunds.investValue, deltaValue:mutualFunds.deltaValue}}/>
                    {mutualFunds.map((mutualFund) => (
                        <div key={mutualFund._id}> 
                            <FundCard 
                            data={mutualFund}
                            openDialog={openDialog}
                            />
                        </div>
                    ))}
                </Grid>
                <Grid container justify="center">
                    <Button 
                    className={classes.newButton} 
                    variant="contained"
                    onClick={handleAddNew}
                    variant="contained" 
                    color="primary"
                    >
                        Add New
                    </Button>
                </Grid>
                <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialog}}>
                    <DialogTitle >{values.id?"Update mutual fund":"Add new mutual fund"}</DialogTitle>
                    <DialogContent>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Fund Name here.." 
                        label="Name"
                        type="text"
                        name="name"
                        autoComplete='off'
                        value={values.name}
                        inputProps={{style: {fontSize: 15}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 15}}} // font size of input label
                        className={classes.textField}
                        required={true}
                        fullWidth
                        onChange={handleInputChange}
                        {...(errors.name && {error:true, helperText:errors.name} )}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Enter Amount here.." 
                        label="Amount"
                        type="number"
                        name="amount"
                        autoComplete='off'
                        inputProps={{style: {fontSize: 15}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 15}}} // font size of input label
                        value={values.amount}
                        className={classes.textField}
                        onChange={handleInputChange}
                        {...(errors.amount && {error:true, helperText:errors.amount} )}
                        required={true}
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined" 
                            label="Mutual Fund Date"
                            format={"dd/MM/yyyy"}
                            name="mfdate"
                            inputProps={{style: {fontSize: 15}}} // font size of input text
                            InputLabelProps={{style: {fontSize: 15}}} // font size of input label
                            value={mfDate}
                            className={classes.textField}
                            onChange={date => setMFDate(date)}
                            fullWidth
                            />
                    </MuiPickersUtilsProvider>
                    <TextField
                        variant="outlined"
                        placeholder="Enter Fund API here.." 
                        label="apiLink"
                        type="text"
                        name="apiLink"
                        autoComplete='off'
                        inputProps={{style: {fontSize: 15}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 15}}} // font size of input label
                        value={values.apiLink}
                        className={classes.textField}
                        onChange={handleInputChange}
                        {...(errors.apiLink && {error:true, helperText:errors.apiLink} )}
                        required={true}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Enter Amount here.." 
                        label="Units"
                        type="number"
                        name="units"
                        inputProps={{style: {fontSize: 15}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 15}}} // font size of input label
                        autoComplete='off'
                        className={classes.textField}
                        value={values.units}
                        onChange={handleInputChange}
                        {...(errors.units && {error:true, helperText:errors.units} )}
                        className={classes.textField}
                        required={true}
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button className={classes.dialogButton} onClick={handleClose} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button className={classes.dialogButton} onClick={handleSubmit} variant="contained" color="primary">
                        {(values.id)?"Update":"Create"}
                    </Button>
                    </DialogActions>
                </Dialog>
            </> 
        )}
    </>
    )
}

export default MutualFundScreen;