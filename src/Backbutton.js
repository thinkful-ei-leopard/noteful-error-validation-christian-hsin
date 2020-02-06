import React from 'react';
import {  Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from './CircleButton/CircleButton'

export default function Backbutton (){
    return (
        <CircleButton
        tag={Link}
        to='/'
        type='button'
        className='NoteListNav__add-folder-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
    )
}