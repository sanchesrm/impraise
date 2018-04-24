import React, { Component } from 'react';
import { FormControl, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { shortUrl, fetchUrlShortened, fetchShortenedURLS } from '../../actions/index'

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            urlToBeShortened: ''
        }
    }

    handleClickToShort = () => {
        this.setState({
            loading: true
        });
        let props = this.props;
        let currentThis = this;
        let url = this.state.urlToBeShortened;
        let newShortCode = null;
        this.setState({
            urlToBeShortened: ''
        });
        
        let promise = props.shortUrl(url).then((returnedShortUrl) => {
            newShortCode = returnedShortUrl.payload.data.shortcode;

            return props.fetchUrlShortened(newShortCode)
        }).catch((e) => {
            props.showError(e.data);
            currentThis.setState({
                loading: false
            });
        });

        promise.then((returnedURLShortened) => {
            props.fetchShortenedURLS({ [newShortCode]: { ...returnedURLShortened.payload.data, url, newElement: true }, ...props.shortenList });

            currentThis.setState({
                loading: false
            });
        }).catch(function (err) {
            props.showError("An error occurred while fetching the URLs");
        });
    }

    handleURLChange = (evt) => {
        this.setState({ urlToBeShortened: evt.target.value });
    }

    render() {
        return(
            <Row>
                <Col md={9}>
                    <FormControl type="text" placeholder="Place the link you want to shorten here" className="shortenInput" 
                        inputRef={(ref) => {this.urlToBeShortened = ref}} onChange={ this.handleURLChange.bind(this) } value={this.state.urlToBeShortened}/>
                </Col>
                <Col md={3}>
                    <Button bsStyle="danger" className="shortenButton pull-right" 
                        onClick={ this.handleClickToShort.bind(this) } loading={ this.state.loading } disabled={this.state.urlToBeShortened === ''} >
                        Shorten this link
                    </Button>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps({ shortenList }) {
    return { shortenList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ shortUrl, fetchUrlShortened, fetchShortenedURLS }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);