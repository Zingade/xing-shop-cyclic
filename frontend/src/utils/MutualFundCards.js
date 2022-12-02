import React from 'react';
import { IconButton, Card, CardContent, Grid, makeStyles, Typography, Tooltip } from '@material-ui/core';
import { MdModeEdit } from 'react-icons/md';


const useStyles = makeStyles({
    fundcard:{
        margin:"5px 5px",
        width: 375,
        height:"auto",
        textAlign:"left",    
        borderRadius:"20px",    
        backgroundColor:"#edeeef"   
    },
    assetcard:{
        margin:"5px 5px",
        width: "98%",
        height:"auto",
        textAlign:"center",
        borderRadius:"20px",
        backgroundColor:"#edeeef"   
    },
    assetText:{
        color:"rgb(0,0,0)", 
        fontWeight: 600, 
    },
    profitText:{
        color:"#28a745", 
        fontSize: 30, 
    },
    lossText:{
        color:"#ff073a", 
        fontSize: 30, 
    },
    curValueText:{
        color:"#201aa2dd", 
        fontSize: 45, 
    },
    fundName:{
        color:"#007bff", 
        fontSize: 22, 
    },
    fundNav:{
        color:"#6c757d", 
        fontSize: 20, 
    },
    fundAmount:{
        color:"#6c757d", 
        fontSize: 20, 
    },
    fundCurValue:{
        color:"#6c757d", 
        fontSize: 20, 
    },
    fundGain:{
        color:"#28a745", 
        fontSize:25,
    },
    fundLoss:{
        color:"#ff073a", 
        fontSize:25,
    },
    navGain:{
        color:"#28a745", 
        fontSize:20,
    },
    navLoss:{
        color:"#ff073a", 
        fontSize:20,
    },
    button: {
        float:"right",
        padding:"2px",    
      },
})

const FundCard = (props) => {
    const {data, openDialog} = props;
    const classes = useStyles();

    const handleEdit = () => {
        openDialog({id:data._id, name: data.name, amount:data.amount, apiLink:data.apiLink, mutualFundDate:data.mutualFundDate, units:data.units})
    }

    return (
        <Grid item component={Card} elevation={10} className={classes.fundcard}>
            <CardContent>
                <Typography variant="h5" className={classes.fundName}>{data.name}</Typography>
                <Typography variant="h5" className={classes.fundNav}>Fund NAV: ₹{data.nav} <span className={(data.delta>0)?classes.navGain:classes.navLoss}>({parseFloat(data.delta).toFixed(2)})</span></Typography>
                <Typography variant="h5" className={classes.fundAmount}>Invested Amount: ₹{data.amount}</Typography>
                <Typography variant="h5" className={classes.fundAmount}>Current Value: ₹{parseFloat(data.total).toFixed(0)}<span className={(data.delta>0)?classes.navGain:classes.navLoss}> ({parseFloat(data.delta*data.units).toFixed(2)})</span></Typography>
                <Typography variant="h5" className={(data.profit>0)?classes.fundGain:classes.fundLoss}>{(data.profit > 0)?"Gain:":"Loss:"} ₹{parseFloat(data.profit).toFixed(0)} ({parseFloat(data.profitPercentage).toFixed(2)}%)
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEdit} className={classes.button}> <MdModeEdit fontSize={"large"}/>Edit</IconButton>
                    </Tooltip>
                </Typography>
            </CardContent>
        </Grid>
    )
}

const AssetCard = (props) => {
    const {data} = props;
    const profit = data.curValue - data.invValue;
    const profitPer = parseFloat(profit * 100 / data.invValue).toFixed(2);
    const classes = useStyles();
    return (
        <Grid item component={Card} elevation={10} className={classes.assetcard}>
            <CardContent>
                <Typography variant="subtitle1" className={classes.assetText}>Current Value</Typography>
                <Typography variant="h3" className={classes.curValueText}>₹{parseFloat(data.curValue).toFixed(0)}<span className={(data.deltaValue>0)?classes.navGain:classes.navLoss}>({parseFloat(data.deltaValue).toFixed(0)})</span> </Typography>
                <Typography variant="h4" className={(profit > 0)?classes.profitText:classes.lossText}>₹{parseFloat(profit).toFixed(0)} ({profitPer}%)</Typography>
            </CardContent>
        </Grid>
    )
}

export {FundCard,AssetCard};