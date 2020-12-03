import React, { Component } from "react";
import ReactDOM from "react-dom";
import { getPriceAndStock } from "../cl"

class Label extends Component {
    constructor() {
        super();

        this.state = {
            value: {}
        };
    }
    componentDidMount() {
        getPriceAndStock(document.getElementById("SKU").value).then(price => this.setState({ value: price })).catch(e => console.log(e.message))
    }


    render() {
        return (
            <div>
                <h1>Price: {this.state.value.price}</h1>
                <h1> Stock: {this.state.value.stock}</h1>
            </div>
        );
    }
}

export default Label;

const wrapper = document.getElementById("price_label");
wrapper ? ReactDOM.render(<Label />, wrapper) : false;