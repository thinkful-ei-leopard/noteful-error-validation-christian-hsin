import React from 'react'
import ValidationError from './ValidationError'
import ApiContext from './ApiContext'
import config from './config'

export default class AddFolder extends React.Component {
   static contextType = ApiContext;
   
    constructor(props) {
        super(props);

        this.state = {
            name: {
                value: "",
                touched: false
            }
        };
    }


    updateName(title) {
        this.setState({ name: { 
            value: title,
            touched: true}});
    }

    handleSubmit=(event)=> {
        event.preventDefault();
        const {name} = this.state;
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body:JSON.stringify({
                name:name.value
            })
          })
            .then(res => {
              if (!res.ok){
                return res.json().then(e => Promise.reject(e))
               } 
               return res.json()
            })
            .then((data) => {
                this.context.addFolder(data);
                this.props.history.push('/');
            })
            .catch(error => {
              console.error( error.message )
            })
    }
    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return "Name is required"; 
        }
            else if (name.length < 3) {
                return "Name must be at least 3 characters long";
            }
        }
    
render() {
    const nameError = this.validateName();
    return (
    <div>
    <form onSubmit={(event)=>this.handleSubmit(event)} className="addfolderform">
        <h2> Create a folder </h2>
        <div>
        <label htmlFor="name"> Name </label> 
        <br></br>
        <input type="text" name ="name" id='name'value={this.state.name.value} onChange={e => this.updateName(e.target.value)} required/>
        {this.state.name.touched && <ValidationError message={nameError} />}
        </div>
        <br></br>
        <button 
        type="submit"
        className = "add-folder-button"
        disabled= {
            this.validateName()
        }> 
        Add Folder 
        </button> 
        </form>
        </div>
        );
    }
}

