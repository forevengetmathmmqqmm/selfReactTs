import { Modal } from "antd";
import React from "react";
interface PropsInter {
  isModalOpen: boolean
  title: string
  children: any
  changeOpen: (val: boolean) => void
  modalOk: (val: any) => void
}
interface formInter {
  [key: string]: string | number
}
export default class ModalSelf extends React.Component<PropsInter> {
  handleOk = () => {
    this.props.children.ref.current.submit((data: formInter) => {
      this.props.changeOpen(false)
      this.props.modalOk(data)
    })
  }
  handleCancel = () => {
    this.props.changeOpen(false)
  }
  render(): React.ReactNode {
    return <>
      <Modal title={this.props.title} open={this.props.isModalOpen} okButtonProps={{ className: 'bg-[#50d71e]' }}
        onOk={this.handleOk} onCancel={this.handleCancel}>
        { this.props.children }
      </Modal>
    </>
  }
}