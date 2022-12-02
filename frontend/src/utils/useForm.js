import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core';

export function useForm(initialFValues) {
    const [values, setValues] = useState(initialFValues)
    const [errors, setErrors] = useState({})
    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }
    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
    }
}

const useStyles = makeStyles(theme => ({
    root:{
        '& .MuiFormControl-root':{
            width:"90%",
            padding:theme.spacing(1),
        }
    }
}))

export function Form(props) {
    const {onSubmit} = props
    const classes = useStyles()
    return (
        <form className={classes.root} autoComplete={"off"} onSubmit={onSubmit}>
            {props.children}
        </form>
    )
}