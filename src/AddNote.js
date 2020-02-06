import React, { Component } from 'react';
import ValidationError from './ValidationError'
export default class AddNote extends Component{

    constructor(props) {
        super(props);
        this.state = {
          name: {
            value: '',
            touched: false
          },
           content: {
            value: '',
            touched: false
          },
        selectFolder: {
            value: '',
            touched: false
          }
        }
      }

      updateName(name) {
        this.setState({name: {value: name, touched: true}});
      }
      
      updateContent(content) {
        this.setState({content: {value: content, touched: true}});
      }
      
      updateSelectFolder(selectFolder) {
        this.setState({selectFolder: {value: selectFolder,touched: true }});
      }

      handleAddNote (event) {
        event.preventDefault();
        const { name, content, selectFolder } = this.state;
        console.log("name", name)
        console.log("content", content)
        console.log("select", selectFolder)
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } 
      }

      validateContent() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
          return 'Content is required';
        } 
      }

      validateSelectFolder() {
        const selectFolder = this.state.selectFolder.value.trim();
    
        if (selectFolder === '') {
          return 'Please select a folder';
        }
      }
        
    render(){

        const nameError = this.validateName
        const contentError = this.validateContent
        const selectFormError = this.validateSelectFolder
        //const disabled = this.validateName ||this.validateContent || this.validateSelectFolder
        return(
            <div>
            <form className="addnoteform" onSubmit={this.handleAddNote}>
                <h2>Create a note</h2>
                <label>Name</label><br></br>
                <input type="text" name="name" onChange={e => this.updateName(e.target.value)}/>
                {this.state.name.touched && <ValidationError message={nameError} />}
                <br></br>
                <label>Content</label>
                <br></br>
                <textarea row="8" coloum ="10" name="content" onChange={e => this.updateContent(e.target.value)}></textarea>
                {this.state.content.touched && <ValidationError message={contentError} />}
                <br></br>
                <label>Folder</label>
                <br></br>
                <select name="selectFolder" onChange={e => this.updateselecFolder(e.target.value)}>
                {this.state.selectFolder.touched && <ValidationError message={selectFormError} />}
                    <option>...</option>
                    <option>dog</option>
                   
                </select><br></br>
        
                <button   
                type="submit"
                
                >
                    Add note</button>  
            </form>
           
            </div>
        )
    }
   
}

//disabled= {disabled ? true: false}