import React, { Component } from 'react'

import LavaLampMenu from 'react-lava-lamp-menu'

const items = [
	{name: 'People', id: 'people'},
	{name: 'My Inbox', id: 'inbox'},
	{name: 'Other Stuff', id: 'other'},
	{name: 'Idk', id: 'idk'}
]

export default class App extends Component {
  state = {
  	selectedItemId: 'inbox'
  }

  handleSelectedItemChange = selectedItemId => {
  	this.setState({selectedItemId})
  }

  render () {
  	const { selectedItemId } = this.state;
    return (
      <div className='app'>
        <LavaLampMenu onSelectedItemChange={this.handleSelectedItemChange} items={items} selectedItemId={selectedItemId}/>
      </div>
    )
  }
}
