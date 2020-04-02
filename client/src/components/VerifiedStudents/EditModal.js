import React from 'react';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import "./EditModal.css";


class EditModal extends React.Component {
    constructor(props) {
        console.log(props.student.name + "'s edit modal is being created.")     // this isn't being logged when showEditModal is being called
        super(props)
        this.state = {
            student: this.props.student,    // the student's information that is passed in on VerifiedStudent.js
            isOpen: false,
            checkedASB: false,              // props.student.hasASB (or whatever you want to name it Saim) once that is added to the data base, false for now
            checkedOffSix: false,           // props.student.offSix once that is added to the data base, false for now
            checkedOffLunch: false,         // props.student.offLunch once that is added to the data base, false for now

        }

        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose = () => {
        this.setState = { isOpen: false };
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: ![event.target.name]
        });
    }

    render() {
        return (
            console.log(this.state.student.name + "'s Modal") &&
            <div className="modal">
                <Modal open={this.state.isOpen} onClose={this.handleClose}>
                    <h2>Edit {this.state.student.name}</h2>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.checkedASB} onChange={this.handleChange} name="checkedASB" />}
                            label="ASB"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.checkedOffSix} onChange={this.handleChange} name="checkedOffSix" />}
                            label="Off Campus Sixth Period"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.checkedOffLunch} onChange={this.handleChange} name="checkedOffLunch" />}
                            label="Off Campus Lunch"
                        />
                    </FormGroup>
                    <Button className="save" color="primary" variant="contained" onClick={this.handleClose} disableElevation>Save Changes</Button>
                    <Button className="cancel" variant="contained" onClick={this.handleClose} disableElevation>Cancel</Button>
                    {/*
                        Right now the two buttons do the same thing, they just close the modal.
                    */}
                </Modal>
            </div>
        )
    }
}

export default EditModal;