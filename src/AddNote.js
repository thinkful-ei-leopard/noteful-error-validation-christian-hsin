import React, { Component } from 'react';
import ValidationError from './ValidationError';
import ApiContext from './ApiContext'
import config from './config'

export default class AddNote extends Component {
  static contextType = ApiContext;

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
        folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1'
      }
    }
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  updateSelectFolder(selectFolder) {
    const name = selectFolder[selectFolder.selectedIndex].value;
    this.setState({ 
      selectFolder: { 
      value: name,  
      folderId: selectFolder[selectFolder.selectedIndex].id, 
       } 
    });
  }

  createFolderList() {
    const folders = this.context.folders;
    return folders.map(folder => {
        return (
            <option 
                key={folder.id}
                id={folder.id} 
                value={folder.name}>{folder.name}</option>
        );
    });
  }
  

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }else if(name.length < 3) {
      return 'Please keep the note title more than 3 characters.'
  }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return 'Content is required';
    }
  }

  validateSelectFolder() {
    const selectFolder = this.state.selectFolder.value.trim();

    if (selectFolder) {
      return 'Please select a folder';
    }
  }
 
  handleAddNote(event){
    event.preventDefault();
    //const { name, content, folder } = this.state;
    const name = this.state.name.value;
    const content = this.state.content.value;
    const folderId = event.target["selectFolder"].value;
    const modified = new Date();

    const data = {
      name,
      modified,
      folderId,
      content
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (!res.ok) {
        throw new Error(`Error with POST request: ${res}`);
      }
      return res.json();
    })
    .then((data) => {
      this.context.addNote(data);
      this.props.history.push('/');
    })
    .catch(error => {
      console.log(error.message);
    });
}



  render() {

    const nameError = this.validateName();
    const contentError = this.validateContent();
    const selectFormError = this.validateSelectFolder();
    const disabled = this.validateName() ||this.validateContent() || this.validateSelectFolder()
    return (
      
        <form className="addnoteform" onSubmit={((event)=>this.handleAddNote(event))}>
          <h2>Create a note</h2>
          <label htmlFor="name">Name</label><br></br>
          <input type="text" name="name" id="name" onChange={e => this.updateName(e.target.value)} />
          {this.state.name.touched && <ValidationError message={nameError} />}
          <br></br>
          <label htmlFor="content">Content</label>
          <br></br>
          <textarea row="8" coloum="10" name="content" id="content" onChange={e => this.updateContent(e.target.value)}></textarea>
          {this.state.content.touched && <ValidationError message={contentError} />}
          <br></br>
          <label htmlFor="selectFolder">Folder</label>
          <br></br>
          <select name="selectFolder" id="selectFolder" >
            {this.state.selectFolder.touched && <ValidationError message={selectFormError} />}
            <option value=" ">...</option>
         {this.context.folders.map(folder => (<option value={folder.id}>{folder.name}</option>))}

          </select><br></br>

          <button
            type="submit" 
           disabled= {disabled ? true: false}>
            Add note</button>
         </form>

     
    
     
    );
  }


}
