import React from 'react'
import ValidationError from './ValidationError'
import ApiContext from './ApiContext'

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: "",
                touched: false
            }
        };
    }


    updateName(name) {
        this.setState({ name: { value: name, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name} = this.state;
        console.log("Name: ", name.value);
    }
    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return "Name is required"; }
            else if (name.length < 3) {
                return "Name must be at least 3 characters long";
            }
        }
    
render() {
    const nameError = this.validateName();
    return (
    <div>
    <form className="addfolderform">
        <h2> Create a folder </h2>
        <div>
        <label> Name </label> 
        <br></br>
        <input type="text" name ="name" onChange={e => this.updateName(e.target.value)}/>
        {this.state.name.touched && <ValidationError message={nameError} />}
        </div>
        <br></br>
        <button 
        type="submit"
        className = "add-folder-button"
        disabled= {
            this.validateName()
        }
        > 
        Add Folder 
        </button> 
        </form>
        </div>
        );
    }
}

