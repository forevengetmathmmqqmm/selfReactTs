import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Descriptions, Input, Modal, Tabs, TabsProps } from 'antd';
import SelfIcon from '../components/common/self-icon';
import { connect } from 'react-redux';
import { userInfoInter } from '../utils/inter';
import { walletApi } from '../api/user';
import { web3Wallet } from '../actions';
const { Wallet } = ethers;
const WebThree: React.FC<{
  userInfo: userInfoInter
  setWallet: (wallet: any) => void
  wallet: any
}> = (props) => {
  let provider: ethers.AbstractProvider = new ethers.JsonRpcProvider('http://localhost:8545')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeKey, setActiveKey] = useState('login')
  const [password, setPassword] = useState('')
  const [loading , setLoading] = useState(false)
  const [balance , setBalance] = useState('')
  const [block , setBlock] = useState(0)
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
    if(props.wallet.address) {
      setIsModalOpen(false)
      provider.getBalance(props.wallet.address).then((balance) => {
        const etherString = ethers.formatEther(balance)
        setBalance(etherString)
      });
      provider.getBlockNumber().then((block) => {
        setBlock(block)
      });
    } else {
      setIsModalOpen(true)
    }
  }, [props.wallet])
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
    props.setWallet(wallet)
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
      <div className="w-full h-full p-[24px] flex">
        <div className='w-full h-full bg-white p-[12px] flex flex-col items-center'>
          <SelfIcon className="text-6xl" type="icon-xiaohuli" />
          <div className='max-w-[500px] w-full'>
          <Descriptions column={1}>
            <Descriptions.Item label="昵 称">{props.userInfo.nickname}</Descriptions.Item>
            <Descriptions.Item label="钱包地址">{ props.wallet.address }</Descriptions.Item>
            <Descriptions.Item label="余 额">{ balance }</Descriptions.Item>
            <Descriptions.Item label="当前区块">{ block }</Descriptions.Item>
          </Descriptions>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    userInfo: state.user.userInfo,
    wallet: state.web3.wallet,
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  setWallet: (wallet: any) => dispatch(web3Wallet(wallet)),
})
export default connect(mapStateToProps, mapDispatchToProps)(WebThree)