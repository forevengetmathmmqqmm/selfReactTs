import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Input, Modal, Tabs, TabsProps } from 'antd';
import SelfIcon from '../components/common/self-icon';
import { connect } from 'react-redux';
import { userInfoInter } from '../utils/inter';
import { walletApi } from '../api/user';
const { Wallet } = ethers;
const WebThree: React.FC<{
  userInfo: userInfoInter
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [activeKey, setActiveKey] = useState('login')
  const [password, setPassword] = useState('')
  const [loading , setLoading] = useState(false)
  let wallet
  const onInpChange = (e: any) => {
    setPassword(e.target.value)
  }
  const [items, _] = useState<TabsProps['items']>([
    {
      key: 'login',
      label: '登录',
      children: <>
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <SelfIcon className="text-6xl" type="icon-xiaohuli" />
          <Input.Password  showCount className='w-[60%] mt-[24px]' placeholder='请输入钱包密码' onChange={onInpChange}/>
        </div>
      </>,
    },
    {
      key: 'register',
      label: '注册',
      children: <>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <SelfIcon className="text-6xl" type="icon-xiaohuli" />
        <Input.Password  showCount className='w-[60%] mt-[24px]' placeholder='请输入钱包密码' onChange={onInpChange}/>
      </div>
    </>,
    },
  ])
  useEffect(() => {

  }, [])
  const handleOk = async () => {
    setLoading(true)
    if(activeKey == 'login'){
      wallet = Wallet.fromEncryptedJsonSync(props.userInfo.keystore, password)
    } else {
      wallet = Wallet.createRandom()
      const keystore = wallet.encryptSync(password)
      await walletApi({
        wallet_address: wallet.address,
        keystore,
      })
    }
    setLoading(false)
    setIsModalOpen(false)
  }
  const tanChange = (activeKey: string) => {
    setActiveKey(activeKey)
  }
  return (
    <>
      <Modal title="Web3" open={isModalOpen} keyboard={false} maskClosable={false} closeIcon={false}
        footer={<>
          <Button type="primary" danger onClick={handleOk} loading={loading}>ok</Button>
        </>}
        okButtonProps={{ danger: true }}>
        <Tabs activeKey={ activeKey } items={items} onChange={ tanChange }/>
      </Modal>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    userInfo: state.user.userInfo
  }
}
export default connect(mapStateToProps)(WebThree)