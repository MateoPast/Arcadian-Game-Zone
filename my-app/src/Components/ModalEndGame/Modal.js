import '../Modal/Modal.scss';
import { memo } from 'react';
import classnames from 'classnames';


function Modal({ openModal, children }) {
  return (
    <div className={classnames('modal', {openModal})}>
      <div className="modal-overlay"></div>

      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

export default memo(Modal);