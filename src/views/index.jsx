import React from 'react'
import { addCount, subCount} from '@/store/actions';
import { Provider, connect } from 'react-redux'
import store from '@/store/index'

class Index extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {count , addCount, subCount } = this.props
    return (
      <div>
          <h1>Hi React</h1>
          <div><span>count:</span><span>{count}</span></div>
          <button onClick={()=> addCount(1)}>增加</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: (params)=> {
      dispatch(addCount(params))
    },
    subCount:(params)=> {
      dispatch(subCount(params))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
