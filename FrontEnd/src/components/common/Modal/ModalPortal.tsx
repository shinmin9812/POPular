import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

function ModalPortal({ children }: Props) {
  return createPortal(<>{children}</>, document.getElementById('modal') as HTMLDivElement);
}

export default ModalPortal;
