import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'
import ShortenList from '../components/ShortenList'
import { Row, Button, Alert } from 'react-bootstrap';
import { fetchShortenedURLS, fetchUrlShortened } from '../../actions/index'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './main.css'

class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertMessage: ''
        }
    }

	componentDidMount() {	
        let props = this.props;	
        // Object.keys(props.shortenList).map((keyName) => (
        //     props.fetchUrlShortened(keyName).then((returnedPayload) => {
        //         console.log("test");
        //         console.log(returnedPayload);
        //         console.log(props.shortenList);
                
        //         props.shortenList[keyName].redirectCount = returnedPayload.payload.data.redirectCount;
        //         props.shortenList[keyName].lastSeenDate = returnedPayload.payload.data.lastSeenDate;
        //         console.log(props.shortenList);
        //     })
        // ));
	}

    clearHistory = () => {
        this.props.fetchShortenedURLS({});        
    }

    showError = (alertMessage) => {
        this.setState({
            showAlert: true,
            alertMessage: alertMessage
        })

        setTimeout(() => {
            this.setState({
                showAlert: false,
                alertMessage: ''
            })
        }, 3000);
    }

    render() {
        return (
            <div>
                <SearchBar showError={ this.showError }/>

                <Row className="clearHistoryRow">
                    <span className="previously-shortened-text">Previously shortened by you</span>
                    <Button className="clear-history-btn" bsStyle="link" onClick={this.clearHistory.bind(this)}>Clear history</Button>
                </Row>

                { (this.state.showAlert) ?
                    <Alert bsStyle="warning">
                        { this.state.alertMessage }
                    </Alert> : null
                }
                <ShortenList />
            </div>
        )
    }
}

function mapStateToProps({ shortenList }) {
    return { shortenList };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchShortenedURLS, fetchUrlShortened }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);