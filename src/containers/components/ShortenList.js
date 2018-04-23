import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from "react-redux";
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ShortenList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredRow: ''
        }
    }

	handleEnter = (keyName) => {
		this.setState({ hoveredRow: keyName });
	}

	handleLeave = () => {
		this.setState({ hoveredRow: '' });
	}

    mapTable = () => {
        if (Object.keys(this.props.shortenList).length) {
            return (
                Object.keys(this.props.shortenList).map((keyName) => (
                    <CopyToClipboard text={ this.props.shortenList[keyName].url } key={ keyName } >
                        <tr onMouseEnter={this.handleEnter.bind(this, keyName)} onMouseLeave={this.handleLeave.bind(this, keyName)}>
                            <td>
                                <div> 
                                    shooooort.com/<span>{ keyName }</span>
                                    { this.state.hoveredRow === keyName ? (<span className="copyLink">Click to copy this link</span>) : ''}  
                                </div>
                                <span>{ this.props.shortenList[keyName].url }</span>        
                            </td>
                            <td>{ this.props.shortenList[keyName].redirectCount }</td>
                            <td>{ this.props.shortenList[keyName].lastSeenDate ? moment(this.props.shortenList[keyName].lastSeenDate).fromNow() : '-' }</td>
                        </tr>
                    </CopyToClipboard>
                ))
            );
        } else {
            return (
                <tr className="noURLToShow"><td colSpan="3">No shortened URL's to show</td></tr>  
            );
        }
    }

    render() {
        return (
            <div>
                <Table responsive>
                    <thead className="table-header">
                        <tr>
                            <th>LINK</th>
                            <th>VISITS</th>
                            <th>LAST VISITED</th>
                        </tr>
                    </thead>
                    <tbody className="table-body"> 
                        { this.mapTable() }
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStateToProps({ shortenList }) {
    return { shortenList };
}

export default connect(mapStateToProps)(ShortenList);