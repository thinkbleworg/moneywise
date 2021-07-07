import React, { Suspense, useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    color: theme.palette.grey[500],
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" style={{ marginRight: "15px" }}>
          {children}
        </Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Box>
    </MuiDialogTitle>
  );
});

// DialogContent has to be called from dialog caller Component and content should be wrapped under DialogContent
// <DialogContent>content</DialogContent>
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// CustomDialogActions has to be called from dialog caller Component
// All the below props are passed from DialogHOC to Dialog Caller and then to customDialogActions
const CustomDialogActions = ({ actionProps, handleSave }) => {
  // console.log("actionProps ----", actionProps);
  const CancelButton = () =>
    actionProps.cancelText && (
      <Button
        variant="contained"
        onClick={actionProps.handleCloseDialog}
        color="default"
      >
        {actionProps.cancelText}
      </Button>
    );

  const SaveButton = () =>
    actionProps.saveText && (
      <Button
        variant="contained"
        disabled={actionProps.disableSaveButton}
        onClick={handleSave}
        color="primary"
      >
        {actionProps.saveText}
      </Button>
    );

  return (
    <DialogActions>
      <CancelButton />
      <SaveButton />
    </DialogActions>
  );
};

const withDialog = (WrappedComponent) => {
  const DialogHOC = ({
    dialogOpen,
    dialogTitle,
    showCloseButton,
    disableSaveOnOpen,
    saveText,
    cancelText,
    handleCloseDialog,
    ...props
  }) => {
    const [disableSaveButton, setDisableSaveButton] = useState(
      disableSaveOnOpen || false
    );

    const [dialogRendered, setDialogRendered] = useState(false);

    const handleDialogEntered = () => {
      // console.log("dialog entered");
      setDialogRendered(true);
    };

    return (
      <Dialog
        open={dialogOpen}
        keepMounted={props.keepMounted}
        onClose={props.handleCloseDialog}
        onEntered={handleDialogEntered}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        {showCloseButton ? (
          <DialogTitle id="form-dialog-title" onClose={handleCloseDialog}>
            {dialogTitle}
          </DialogTitle>
        ) : (
          <MuiDialogTitle id="form-dialog-title">{dialogTitle}</MuiDialogTitle>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <WrappedComponent
            {...props}
            setDisableSaveButton={setDisableSaveButton}
            actionProps={{
              disableSaveButton,
              saveText,
              cancelText,
              handleCloseDialog,
            }}
            dialogRendered={dialogRendered}
            DialogContent={DialogContent}
            DialogActions={CustomDialogActions}
          />
        </Suspense>
      </Dialog>
    );
  };
  return DialogHOC;
};

export default withDialog;

// Format to call the dialog
/* 
// ActionProps can be passed directly to <DialogAction>
const ContentComponent = ({
  actionProps,
  setDisableSaveButton,
  DialogContent,
  DialogActions,
  dialogRendered,
  handleSaveDialog,
  ...otherProps
}) => {

  const saveHandler = () => {
    ... custom code
    handleSaveDialog(); //Parent savehandler
  }

  useEffect(() => {
    setDisableSaveButton(false|true)
  }, customInput)

  useEffect(() => {
    //Custom code to be called after dialog rendering
  }, dialogRendered);

  return (  
    <DialogContent>
    </DialogContent>
    <DialogActions actionProps={actionProps} handleSave={saveHandler}>
    </DialogActions>
  )
}

const DialogCaller = withDialog(ContentComponent) 

DialogCaller with Save and Cancel Button
<DialogCaller 
    dialogOpen={Boolean:open}
    dialogTitle="String:title"
    handleCloseDialog={Function:closehandler}
    handleSaveDialog={Function:saveHandler}
    showCloseButton={Boolean:true} --- optional
    disableSaveOnOpen={Boolean:true} 
    saveText="String:Save"
    cancelText="String:Cancel" /> 

DialogCaller without cancel and save button but close button in dialog title
<DialogCaller 
    dialogOpen={Boolean:open}
    dialogTitle="String:title"
    handleCloseDialog={Function:closehandler}
    handleSaveDialog={Function:saveHandler}
    showCloseButton={Boolean:true} --- optional /> 
*/
