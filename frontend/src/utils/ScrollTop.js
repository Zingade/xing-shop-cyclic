import { useScrollTrigger, makeStyles, Zoom } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    scrollTop: {
      zIndex: 2000,
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));

export default function ScrollTop(props) {
    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
});

const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
    "#back-to-top-anchor"
    );

    if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

return (
    <Zoom in={trigger}>
    <div
        onClick={handleClick}
        role="presentation"
        className={classes.scrollTop}
    >
        {children}
    </div>
    </Zoom>
    );
}
  
