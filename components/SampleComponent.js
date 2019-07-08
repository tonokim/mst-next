import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from './Clock'
import style from './style.less'

@inject('store')
@observer
class SampleComponent extends React.Component {
  state = {
    text:3
  }
  constructor(props){
    super(props)
    this.store = this.props.store
  }

  componentWillMount() {
  }

  componentDidMount () {
    // this.props.store.start()
  }

  componentWillUnmount () {
    // this.props.store.stop()
  }

  onClick = () => {
    const { user: { addAge, lastUpdate, start } } = this.store
    addAge()
    start()
  }

  render () {
    return (
      <div>
        <Clock
          lastUpdate={this.store.user.lastUpdate}
          light={false}
        />
        <p>title: {this.props.title}</p>
        <p>Name: {this.props.store.user.name}</p>
        <p>Age: {this.props.store.user.age}</p>
        <button className={style['box']} onClick={this.onClick}>增加</button>
        <nav>
          <Link href={this.props.linkTo}>
            <a>Navigate</a>
          </Link>
        </nav>
      </div>
    )
  }
}

export default SampleComponent
