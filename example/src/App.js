import React, { Component } from 'react'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import LavaLampMenu from 'react-lava-lamp-menu'

const SIMPLE_ITEMS = `[
	{"name": "People", "id": "people"},
	{"name": "My Inbox", "id": "inbox"},
	{"name": "Other Stuff", "id": "other"},
	{"name": "Idk", "id": "idk"}
]`;
const SIMPLE_ITEM_STYLE = `
{
  "color": "grey",
  "padding": "0px 8px",
	"textAlign": "center",
	"cursor": "pointer",
	"position": "relative",
	"height": "20px",
	"lineHeight": "20px",
	"borderRadius": "10px"
}
`;

const SIMPLE_ITEM_MOUSEOVER_STYLE = `
{
	"backgroundColor": "rgba(255, 0, 0, 0.5)",
	"color": "white"
}
`;

const SIMPLE_ITEM_SELECTED_STYLE = `
{
	"color": "white",
	"backgroundColor": "rgba(255, 0, 0, 0.5)"
}
`;
const SIMPLE_SLIDER_STYLE = `
{
	"backgroundColor": "red",
	"height": "20px",
	"borderRadius": "10px"
}
`;
export default class App extends Component {
  state = {
  	selectedItemId: 'inbox',
  	sliderStyleEditorContent: SIMPLE_SLIDER_STYLE,
  	itemStyleEditorContent: SIMPLE_ITEM_STYLE,
  	mouseOverItemStyleEditorContent: SIMPLE_ITEM_MOUSEOVER_STYLE,
  	selectedItemStyleEditorContent: SIMPLE_ITEM_SELECTED_STYLE,
  	itemsEditorContent: SIMPLE_ITEMS
  }

  handleSelectedItemChange = selectedItemId => {
  	this.setState({selectedItemId})
  }

  handleEditorChange = (editor, value) => {
  	this.setState({
  		[editor]: value
  	});
  }

  render () {
  	const {
  		selectedItemId,
  		itemStyleEditorContent,
  		mouseOverItemStyleEditorContent,
  		selectedItemStyleEditorContent,
  		sliderStyleEditorContent,
  		itemsEditorContent
  	} = this.state;
  	let parsedItemStyle = {};
  	let parsedMouseOverItemStyle = {};
  	let parsedSelectedItemStyle = {};
  	let parsedSliderStyle = {};
  	let parsedItems = [{name: "Invalid Menu Items", id: selectedItemId}];
  	try {
  		parsedItemStyle = JSON.parse(itemStyleEditorContent);
  	} catch(e) {}
  	try {
  		parsedMouseOverItemStyle = JSON.parse(mouseOverItemStyleEditorContent);
  	} catch(e) {}
  	try {
  		parsedSelectedItemStyle = JSON.parse(selectedItemStyleEditorContent);
  	} catch(e) {}
  	try {
  		parsedSliderStyle = JSON.parse(sliderStyleEditorContent);
  	} catch(e) {}
  	try {
  		parsedItems = JSON.parse(itemsEditorContent);
  	} catch(e) {}
    return (
      <div className='app'>
      	<h1>react-lava-lamp-menu demo</h1>
      	<div className='menu-container'>
      		<h2>Menu</h2>
      		<div className="lava-lamp-container">
	        	<LavaLampMenu
	        		itemStyle={parsedItemStyle}
	        		mouseOverItemStyle={parsedMouseOverItemStyle}
	        		selectedItemStyle={parsedSelectedItemStyle}
	        		sliderStyle={parsedSliderStyle}
	        		onSelectedItemChange={this.handleSelectedItemChange}
	        		items={parsedItems}
	        		selectedItemId={selectedItemId}/>
        	</div>
        </div>

        <div className='editor'>
        	<h2>Edit Props</h2>
        	<div className="editors">
        		<div className="editor-container">
		        	<h4>items</h4>
							<AceEditor
								height="200px"
								width="100%"
							  mode="javascript"
							  theme="monokai"
							  onLoad={this.onLoad}
							  onChange={v => {this.handleEditorChange('itemsEditorContent', v)}}
							  fontSize={14}
							  showPrintMargin={false}
							  showGutter={false}
							  highlightActiveLine={false}
							  value={itemsEditorContent}
							  setOptions={{
								showLineNumbers: false,
								tabSize: 2,
							}}/>
						</div>
        		<div className="editor-container">
		        	<h4>sliderStyle</h4>
							<AceEditor
								height="200px"
								width="100%"
							  mode="javascript"
							  theme="monokai"
							  onLoad={this.onLoad}
							  onChange={v => {this.handleEditorChange('sliderStyleEditorContent', v)}}
							  fontSize={14}
							  showPrintMargin={false}
							  showGutter={false}
							  highlightActiveLine={false}
							  value={sliderStyleEditorContent}
							  setOptions={{
								showLineNumbers: false,
								tabSize: 2,
							}}/>
						</div>
						<div className="editor-container">
		        	<h4>itemStyle</h4>
							<AceEditor
								height="200px"
								width="100%"
							  mode="javascript"
							  theme="monokai"
							  onLoad={this.onLoad}
							  onChange={v => {this.handleEditorChange('itemStyleEditorContent', v)}}
							  fontSize={14}
							  showPrintMargin={false}
							  showGutter={false}
							  highlightActiveLine={false}
							  value={itemStyleEditorContent}
							  setOptions={{
								showLineNumbers: false,
								tabSize: 2,
							}}/>
						</div>
						<div className="editor-container">
		        	<h4>mouseOverItemStyle</h4>
							<AceEditor
								height="200px"
								width="100%"
							  mode="javascript"
							  theme="monokai"
							  onLoad={this.onLoad}
							  onChange={v => {this.handleEditorChange('mouseOverItemStyleEditorContent', v)}}
							  fontSize={14}
							  showPrintMargin={false}
							  showGutter={false}
							  highlightActiveLine={false}
							  value={mouseOverItemStyleEditorContent}
							  setOptions={{
								showLineNumbers: false,
								tabSize: 2,
							}}/>
						</div>
						<div className="editor-container">
		        	<h4>selectedItemStyle</h4>
							<AceEditor
								height="200px"
								width="100%"
							  mode="javascript"
							  theme="monokai"
							  onLoad={this.onLoad}
							  onChange={v => {this.handleEditorChange('selectedItemStyleEditorContent', v)}}
							  fontSize={14}
							  showPrintMargin={false}
							  showGutter={false}
							  highlightActiveLine={false}
							  value={selectedItemStyleEditorContent}
							  setOptions={{
								showLineNumbers: false,
								tabSize: 2,
							}}/>
						</div>
	        </div>
        </div>
      </div>
    )
  }
}
