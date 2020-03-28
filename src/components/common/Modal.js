import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Button from './Button';
import Loader from './Loader';

const Modal = (props) => {
    const {
        isOpen,
        dialogTitle,
        loading,
        dialogContent,
        buttonPrimaryName,
        buttonSecondaryName,
        buttonSize,
        showClose,
        hideBtns,
        hideTitle,
        buttonPrimaryVariant,
        buttonSecondaryVariant,
        secondaryButtonDisabled,
        errors,
        onClose,
        styleName,
        hideSecondaryBtn,
        onSecondaryClick,
        onPrimaryClick,
        contentStyle,
        showLoader,
        errorExtraClass
    } = props;

    return (
        <div>
            <Dialog
                open={isOpen}
                keepMounted
                {...props}
                className={styleName}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {showClose
                    && (
                        <div className="w3-display-topright w3-margin-bottom">
                            <IconButton aria-label="Close" onClick={onClose}>
                                <CloseIcon style={{ color: '#dadada' }} />
                            </IconButton>
                        </div>
                    )
                }
                {(!hideTitle && dialogTitle) && (
                    <DialogTitle
                        disableTypography
                        className="w3-no-padding w3-margin-top"
                    >
                        {(typeof dialogTitle === 'string')
                            ? dialogTitle.split('\n').map(eachLine => (
                                <Typography key={eachLine} variant="h5">{eachLine}</Typography>
                            ))
                            : dialogTitle
                        }
                    </DialogTitle>
                )}
                <DialogContent className={contentStyle}>
                    {(typeof dialogContent === 'string') ? (
                        <DialogContentText id="alert-dialog-slide-description">
                            {dialogContent}
                        </DialogContentText>
                    ) : dialogContent
                    }
                    <div className="w3-center"> 
                        <div className={`w3-text-red w3-margin-top ${errorExtraClass}`}>
                            {errors}
                        </div>
                    </div>
                </DialogContent>
                {!hideBtns && (
                    <DialogActions className="w3-padding">
                        {showLoader ? (
                            <Loader key="loader" style={{ width: '20px', height: '20px' }} />
                        ) : (
                            <>
                                {!hideSecondaryBtn
                                    && (
                                        <Button
                                            onClick={onSecondaryClick}
                                            color="primary"
                                            variant={buttonSecondaryVariant}
                                            size={buttonSize}
                                            disabled={secondaryButtonDisabled || loading}
                                        >
                                            {buttonSecondaryName}
                                        </Button>
                                    )
                                }
                                <Button
                                    onClick={onPrimaryClick}
                                    color="primary"
                                    variant={buttonPrimaryVariant}
                                    size={buttonSize}
                                    className="w3-margin-left"
                                    disabled={loading}
                                    loading={loading}

                                >
                                    {buttonPrimaryName}
                                </Button>
                            </>
                        )}
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
};

Modal.defaultProps = {
    onSecondaryClick: () => {},
    onPrimaryClick: () => {},
    buttonPrimaryName: 'Okay',
    buttonSecondaryName: 'Cancel',
    buttonPrimaryVariant: 'text',
    buttonSecondaryVariant: 'text',
    styleName: '',
    fullWidth: false,
    buttonSize: 'large'
};

Modal.propTypes = {
    dialogTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    dialogContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    buttonPrimaryVariant: PropTypes.string,
    buttonSize: PropTypes.string,
    buttonSecondaryVariant: PropTypes.string,
    buttonPrimaryName: PropTypes.string,
    buttonSecondaryName: PropTypes.string,
    styleName: PropTypes.string,
    onSecondaryClick: PropTypes.func,
    onPrimaryClick: PropTypes.func,
    fullWidth: PropTypes.bool,
};

export default Modal;
