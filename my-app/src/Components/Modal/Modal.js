import './Modal.scss'
import { memo } from 'react';
import classnames from 'classnames';


function Modal({ openModal, toggleModal, children}) {
  return (
    <div className={classnames('modal', {openModal})} onClick={toggleModal}>

        <div className="modal-overlay"></div>

        <div className="modal-content" onClick={e => e.stopPropagation()}>
            {children}
        </div>
        
    </div>
  )
}
  
  export default memo(Modal);