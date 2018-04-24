import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import ShortenList from '../components/ShortenList';
import { Row, Button, Alert } from 'react-bootstrap';
import { fetchShortenedURLS, fetchUrlShortened } from '../../actions/index';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './main.css';

export class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAlert: false,
            alertMessage: '', 
            showInfoMessage: false,
            infoMessage: ''
        }
    }

	componentDidMount() {	
        let props = this.props;	
        this.setState({
            showInfoMessage: true,
            infoMessage: 'Fetching new data. Just wait a few seconds'
        })
        let promiseArr = Object.keys(props.shortenList).map((keyName) => {
            return props.fetchUrlShortened(keyName).then((returnedPayload) => {                
                props.shortenList[keyName].redirectCount = returnedPayload.payload.data.redirectCount;
                props.shortenList[keyName].lastSeenDate = returnedPayload.payload.data.lastSeenDate;
            })
        });

        Promise.all(promiseArr).then(() => {
            props.fetchShortenedURLS(props.shortenList);

            // This timeout is just to make sure the user can read the message before it disappears.
            // Depending on the fastness of the call, the user couldn't read the message properly
            setTimeout(() => {
                this.setState({
                    showInfoMessage: false,
                    infoMessage: ''
                })
            }, 2000)
        }).catch((err) => {
            this.showError("An error occurred while fetching the URLs");
        });
	}

    clearHistory = () => {
        this.props.fetchShortenedURLS({});        
    }

    showError = (alertMessage) => {
        this.setState({
            showAlert: true,
            alertMessage: alertMessage,
            showInfoMessage: false,
            infoMessage: ''
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
                    <Alert bsStyle="danger">
                        { this.state.alertMessage }
                    </Alert> : null
                }

                {(this.state.showInfoMessage) ?
                    <Alert bsStyle="info">
                        {this.state.infoMessage}
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