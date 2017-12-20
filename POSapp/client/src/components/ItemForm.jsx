import React, { Component } from 'react';
import Auth from '../modules/Auth';

class ItemForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item_name: props.oneItem ? props.oneItem.item.item_name : '',
			item_type: props.oneItem ? props.oneItem.item.item_type : '',
			item_cost: props.oneItem ? props.oneItem.item.item_cost : '',
			item_quantity: props.oneItem ? props.oneItem.item.item_quantity : '',
		}
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value,
		});
	}
	
	render() {
		console.log(this.props);
		return (
			<div className="form">
				<form className={this.props.isAdd ? 'addForm' : 'editForm'} 
					onSubmit={this.props.isAdd ? 
						e => this.props.itemSubmit('POST', e, this.state)
						: e => this.props.itemSubmit('PUT', e, this.state, 
								this.props.oneItem.item.id)}>
								
					<input type="text" name="item_name" placeholder="Item Name"
						value={this.state.item_name} onChange={this.handleInputChange} />
					<input type="text" name="item_type" placeholder="Item Type"
						value={this.state.item_type} onChange={this.handleInputChange} />
					<input type="number" className="number" name="item_quantity" placeholder="Item Quantity"
						value={this.state.item_quantity} onChange={this.handleInputChange} />
					<input type="number" className="number" name="item_cost" placeholder="Item Cost"
						value={this.state.item_cost} onChange={this.handleInputChange} />
					<input type="submit" value={this.props.isAdd ? 'Add it!' : 'Edit it!'} />
				</form>
			</div>
		)
	}
}

export default ItemForm;