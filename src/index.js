import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class LavaLampMenu extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemId: PropTypes.string,
    itemStyle: PropTypes.object,
    mouseOverItemStyle: PropTypes.object,
    selectedItemStyle: PropTypes.object,
    onSelectedItemChange: PropTypes.func.isRequired,
    mouseOverItemBackgroundColor: PropTypes.string
  }

  state = {
    sliderPosition: {},
    mouseOverItemId: "",
  }

  componentDidMount() {
    this.getSliderPosition();
    window.addEventListener("resize", this.getSliderPosition);
  }

  componentDidUpdate() {
    this.getSliderPosition()
  }

  componentWillUnmount() {
    window.removeEventListener("resize",  this.getSliderPosition);
  }

  handleItemMouseOver = id => {
    this.setState({
      mouseOverItemId: id
    })
  }

  handleMouseLeave = () => {
    this.setState({
      mouseOverItemId: ""
    })
  }

  handleItemClick = id => {
    this.props.onSelectedItemChange(id);
  }

  getSliderPosition = () => {
    const { selectedItemId, items } = this.props;
    const { sliderPosition } = this.state;
    const index = items.findIndex(({id}) => id === selectedItemId);
    const selectedItemDiv = this[this.getItemId(selectedItemId)];
    const {x, y, width, height} = selectedItemDiv.getBoundingClientRect();
    const {x: menuContainerX} = this.menuContainer.getBoundingClientRect();

    const sliderMarginLeft = x - menuContainerX;
    const sliderWidth = width //+ itemPadding*2

    if (sliderMarginLeft !== sliderPosition.marginLeft || sliderWidth !== sliderPosition.width) {
      this.setState({
        sliderPosition: { 
          marginLeft: sliderMarginLeft,
          width: sliderWidth
        }
      });
    }
  }

  getItemId = id => `item-${id}`;

  getItemStyle = id => {
    const { itemStyle, mouseOverItemStyle, selectedItemStyle, selectedItemId } = this.props;
    const { mouseOverItemId } = this.state;
    let toReturn = { ...itemStyle };
    if (id === mouseOverItemId) {
      toReturn = {...toReturn, ...mouseOverItemStyle};
    }
    if (id === selectedItemId) {
      toReturn = {...toReturn, ...selectedItemStyle};
    }
    return toReturn;
  }

  render() {
    const {
      items,
      selectedItemId,
      itemStyle,
      sliderStyle,
      mouseOverItemBackgroundColor
    } = this.props
    const { sliderPosition, mouseOverItemId } = this.state;

    return (
      <div className={styles.LavaLampMenu} ref={r => this.menuContainer = r}>
        <div className={styles.slider} style={{
          ...sliderStyle,
          ...sliderPosition
        }}></div>
        {items.map(({id, name}) => {
          const isSelected = id === selectedItemId;
          const isMousedOver = id === mouseOverItemId;
          return (
            <div
              ref={itemDiv => (this[this.getItemId(id)] = itemDiv)}
              onClick={() => this.handleItemClick(id)}
              onMouseOver={() => this.handleItemMouseOver(id)}
              onMouseLeave={() => this.handleMouseLeave(id)}
              key={id}
              style={this.getItemStyle(id)}
              className={`${styles.item} ${isSelected ? styles.selected : ''}`}>
                <div className={styles.name}>{name}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

LavaLampMenu.defaultProps = {
  sliderStyle: {
  },
  itemStyle: {
  },
  mouseOverItemStyle: {
  },
  selectedItemStyle: {
  }
};

