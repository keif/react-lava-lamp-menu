import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import styles from "./LavaLampMenu.module.css";

const LavaLampMenu = (props) => {
  const {
    items,
    itemStyle,
    mouseOverItemStyle,
    onSelectedItemChange,
    selectedItemId,
    selectedItemStyle,
    sliderStyle
  } = props;
  const [sliderPosition, setSliderPosition] = useState({});
  const [mouseOverItemId, setMouseOverItemId] = useState(``);
  const menuRef = useRef(null);
  const itemDivs = useRef({});

  useEffect(() => {
    getSliderPosition();
    window.addEventListener("resize", getSliderPosition);

    return () => window.removeEventListener("resize", getSliderPosition);
  });

  const handleItemMouseOver = (id) => setMouseOverItemId(id);
  const handleMouseLeave = () => setMouseOverItemId(``);
  const handleItemClick = (id) => onSelectedItemChange(id);

  const getSliderPosition = () => {
    const selectedItemDiv = Array.from(menuRef.current.children).find(
      (el) => el.className.indexOf(selectedItemId) > -1
    );
    const { x, y, width, height } = selectedItemDiv.getBoundingClientRect();
    const { x: menuRefX } = menuRef.current.getBoundingClientRect();

    const sliderMarginLeft = x - menuRefX;
    const sliderWidth = width; //+ itemPadding*2
    if (
      sliderMarginLeft !== sliderPosition.marginLeft ||
      sliderWidth !== sliderPosition.width
    ) {
      setSliderPosition({
        marginLeft: sliderMarginLeft,
        width: sliderWidth
      });
    }
  };

  const getItemStyle = (id) => {
    let toReturn = { ...itemStyle };
    if (id === mouseOverItemId) {
      toReturn = { ...toReturn, ...mouseOverItemStyle };
    }
    if (id === selectedItemId) {
      toReturn = { ...toReturn, ...selectedItemStyle };
    }
    return toReturn;
  };

  return (
    <div className={styles.LavaLampMenu} ref={menuRef}>
      <div
        className={styles.slider}
        style={{
          ...sliderStyle,
          ...sliderPosition
        }}
      ></div>
      {items.map(({ id, name }, idx) => {
        const isSelected = id === selectedItemId;
        return (
          <div
            ref={(el) => {
              itemDivs.current[id] = el;
            }}
            onClick={() => handleItemClick(id)}
            onMouseOver={() => handleItemMouseOver(id)}
            onMouseLeave={() => handleMouseLeave(id)}
            key={id}
            style={getItemStyle(id)}
            className={`${styles.item} ${id} ${
              isSelected ? styles.selected : ""
            }`}
          >
            <div className={styles.name}>{name}</div>
          </div>
        );
      })}
    </div>
  );
};

LavaLampMenu.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItemId: PropTypes.string,
  itemStyle: PropTypes.object,
  mouseOverItemStyle: PropTypes.object,
  selectedItemStyle: PropTypes.object,
  onSelectedItemChange: PropTypes.func.isRequired
};

LavaLampMenu.defaultProps = {
  sliderStyle: {},
  itemStyle: {},
  mouseOverItemStyle: {},
  selectedItemStyle: {}
};

export default LavaLampMenu;
