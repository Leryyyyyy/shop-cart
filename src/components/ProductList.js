import React from 'react';
import {connect} from 'dva';
import { d } from '../utils/utils';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import 'antd/dist/antd.css';
import './ProductList.css';


function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

class ProductList extends React.Component  {

  render() {
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
        Highest to lowest
        </Menu.Item>
        <Menu.Item key="2">
        Lowest to Highest
        </Menu.Item>
      </Menu>
    );
  const { products, addToCart } = this.props;
  const list = (products || []).map((item, key) => (
    <li key={key}>
      <div className='pname'>
        <img src={item.jpg} alt=""/>
        <div>{item.title}</div>
        <div>${item.price}</div>
        <div>剩余{item.installments}件</div>
      </div>
      <div>
        <Button type="primary" onClick={() => addToCart(item.id)} disabled={!item.installments} style={{color:'#000000',backgroundColor:"#e8e8e8",borderColor:'#f5f5f5'}}><p style={{margin:'auto',lineHeight:'0px'}}>添加购物车</p></Button>
      </div>
    </li>
  ));
  return (
    <div>
      <h1>Products</h1>
      <div id="components-dropdown-demo-dropdown-button">
    
    <Dropdown overlay={menu}>
      <Button>
      <span style={{margin:'auto',lineHeight:'0px'}}>Order by <Icon type="down" /></span>
      </Button>
    </Dropdown>
  </div>
      <ul className='item'>
        {list}
      </ul>
    </div>
  );
}};

const mapStateToProps = ({products}) => ({
  products: d(products.byId, products.result)
})

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => dispatch({
    type: 'cart/add',
    payload: {
      id
    }
  })
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);