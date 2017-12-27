import React, { Component } from 'react';

class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kiosk_name: props.oneKiosk ? props.oneKiosk.kiosk.kiosk_name : '',
			location: props.oneKiosk ? props.oneKiosk.kiosk.location : '',
			address: props.oneKiosk ? props.oneKiosk.kiosk.address : '',
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
						e => this.props.newKiosk('POST', e, this.state)
						: e => this.props.newKiosk('PUT', e, this.state, 
								this.props.oneKiosk.kiosk.id)}>
								
					<input type="text" name="kiosk_name" placeholder="Kiosk Name"
						value={this.state.kiosk_name} onChange={this.handleInputChange} />
					<input type="text" name="location" placeholder="Location"
						value={this.state.location} onChange={this.handleInputChange} />
					<input type="text" name="address" placeholder="Address"
						value={this.state.address} onChange={this.handleInputChange} />
					<input type="submit" value={this.props.isAdd ? 'Add it!' : 'Edit it!'} />
				</form>
			</div>
		)
	}
}

export default Order;