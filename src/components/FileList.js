import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash,faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from 'prop-types'

const FileList = ({files,onFileClick,onSaveEdit,onFileDelete})=>{
  const [editStatus,setEditStatus] = useState(false)
  const [value,setValue] = useState('')
  
    const closeSearch = (e)=>{
      e.preventDefault()
      setEditStatus(false)
      setValue('')
    }
    useEffect(()=>{
      const handleInputEvent = (event)=>{
        const {keyCode} = event
        if(keyCode === 13 && editStatus){
          const editItem = files.find(file=>file.id === editStatus)
          onSaveEdit(editItem.id,value)
        }else if(keyCode === 27 && editStatus){
          closeSearch(event)
        }
      }
      document.addEventListener('keyup',handleInputEvent)
      return ()=>{
        document.removeEventListener('keyup',handleInputEvent)
      }
    })
    return(
      <ul className="list-group list-group-flush file-list">
        {
          files.map(file=>(
            <li className="list-group-item bg-light row d-flex align-items-center file-item"
            key={file.id}>
              { (file.id !== editStatus)&&
                <>
                <span className="col-2">
                  <FontAwesomeIcon
                    size="lg"
                    icon={faMarkdown}/>
                </span>
                <span className="col-8 c-link" 
                  onClick={()=>{onFileClick(file.id)}}>{file.title}</span>
                <button
                  type="button"
                  className="icon-button col-1"
                  onClick={()=>{setEditStatus(file.id);setValue(file.title)}}
                  >
                  <FontAwesomeIcon 
                  title="编辑"
                  size="lg"
                  icon={faEdit}/>
                </button>
                <button
                  type="button"
                  className="icon-button col-1"
                  onClick={()=>{onFileDelete(file.id)}}
                  >
                  <FontAwesomeIcon 
                  title="删除"
                  size="lg"
                  icon={faTrash}/>
                </button>
                </>
              }
              {
                (file.id === editStatus)&&
                <>
                  <input
                  className="form-control col-10"
                  value={value}
                  onChange={(e)=>{setValue(e.target.value)}}
                  />
                  <button
                  type="button"
                  className="btn btn-primary col-2"
                  onClick={closeSearch}
                  >
                  <FontAwesomeIcon 
                  title="关闭"
                  size="lg"
                  icon={faTimes}/>
                  </button>
                </>
              }
            </li>
          ))
        }
      </ul>
    )
} 

FileList.propTypes={
  files:PropTypes.array.isRequired,
  onFileClick:PropTypes.func,
  onFileDelete:PropTypes.func,
  onSaveEdit:PropTypes.func,
}

export default FileList