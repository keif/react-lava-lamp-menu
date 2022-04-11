# react-lava-lamp-menu

> A menu component with a lava lamp effect when selecting a menu option.
> Refactored as a functional component for a separate elastic menu example


## Demo (class-based component - original demo)
https://jbccollins.github.io/react-lava-lamp-menu/

## Install

```bash
npm install --save react-lava-lamp-menu
```

## Usage

```jsx
import React, { Component } from 'react'

import LavaLampMenu from 'react-lava-lamp-menu'

class Example extends Component {

  state = {
  	selectedItemId: "item1"
  }

  handleSelectedItemChange = id => {
  	this.setState({selectedItemId: id});
  }

  render () {
    return (
		<LavaLampMenu
			itemStyle={{color:'red'}}
			mouseOverItemStyle={{color: 'black'}}
			selectedItemStyle={{backgroundColor: 'black', color: 'red'}}
			sliderStyle={{backgroundColor: 'black'}}}
			onSelectedItemChange={this.handleSelectedItemChange}
			items={[
				name: 'Menu Item 1', id: "item1",
				name: 'Menu Item 2', id: "item2",
				name: 'Menu Item 3', id: "item3",
			]}
			selectedItemId={this.state.selectedItemId}/>
    )
  }
}
```
| prop | description|
|------|------------|
|items | List of menu items |
|itemStyle | Inline style for all items |
|mouseOverItemStyle | Inline style for the item that is currently being moused over. Will override any conflicting styles from `itemStyle` |
| selectedItemStyle | Inline style for the item that is currently selected. Will override any conflicting styles from `itemStyle` and `mouseOverItemStyle` |
| onSelectedItemChange | Receives the selected item id on click |
| selectedItemId | The id of the item that is currently selected |

## Development

From the top level directory run
```yarn start```

In a separate terminal window, from the `example` directory run
```yarn start```

## License

MIT © [jbccollins](https://github.com/jbccollins)
