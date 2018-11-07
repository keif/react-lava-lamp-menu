import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export default class LavaLampMenu extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selectedItemId: PropTypes.string,
    menuPadding: PropTypes.number,
    itemPadding: PropTypes.number,
    onSelectedItemChange: PropTypes.func.isRequired,
    selectedItemBackgroundColor: PropTypes.string
  }

  state = {
    sliderStyle: {},
    mouseOverItemId: "",
  }

  componentDidMount() {
    this.getSliderStyle();
  }

  componentDidUpdate() {
    this.getSliderStyle()
  }

  handleItemMouseOver = id => {
    //console.log('mouseover');
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
    console.log('click');
    this.props.onSelectedItemChange(id);
  }

  getSliderStyle = () => {
    const { selectedItemId, items, menuPadding, itemPadding } = this.props;
    const { sliderStyle } = this.state;
    const index = items.findIndex(({id}) => id === selectedItemId);
    const selectedItemDiv = this[this.getItemId(selectedItemId)];
    console.log(selectedItemDiv.getBoundingClientRect())
    const {x, y, width, height} = selectedItemDiv.getBoundingClientRect();

    const sliderMarginLeft = x - menuPadding;
    const sliderWidth = width //+ itemPadding*2

    if (sliderMarginLeft !== sliderStyle.marginLeft || sliderWidth !== sliderStyle.width) {
      this.setState({
        sliderStyle: { 
          marginLeft: sliderMarginLeft,
          width: sliderWidth
        }
      });
    }
  }

  getItemId = id => `item-${id}`;

  render() {
    const {
      items,
      selectedItemId,
      itemPadding,
      sliderBackgroundColor,
      selectedItemBackgroundColor
    } = this.props
    const { sliderStyle, mouseOverItemId } = this.state;
    console.log(this.refs);

    return (
      <div className={styles.LavaLampMenu}>
        <div className={styles.slider} style={{
          backgroundColor: sliderBackgroundColor,
          ...sliderStyle
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
              style={{
                paddingLeft: itemPadding,
                paddingRight: itemPadding,
                background: isSelected || isMousedOver ? selectedItemBackgroundColor : ''
              }}
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
  menuPadding: 12,
  itemPadding: 8,
  sliderBackgroundColor: 'blue',
  selectedItemBackgroundColor: 'rgba(0,0,255,0.1)'
};

