import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { shortUrl, fetchUrlShortened, fetchShortenedURLS } from '../../actions/index'

class SearchBar extends Component {
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
        this.setState({
            urlToBeShortened: ''
        })
        
        props.shortUrl(url).then((returnedPayload) => {
            let newShortCode = returnedPayload.payload.data.shortcode;

            props.fetchUrlShortened(newShortCode).then((returnedPayload) => {
                props.fetchShortenedURLS({ [newShortCode] : { ...returnedPayload.payload.data, url }, ...props.shortenList });
                
                currentThis.setState({
                    loading: false
                });
            });
        }).catch((e) => {
            props.showError(e.data);
            currentThis.setState({
                loading: false
            });
        })
    }

    handleURLChange = (evt) => {
        this.setState({ urlToBeShortened: evt.target.value });
    }

    render() {
        return(
            <Form horizontal>
                <FormGroup controlId="formInlineName">
                    <Col md={10}>
                        <FormControl type="text" placeholder="Place the link you want to shorten here" className="shortenInput" 
                            inputRef={(ref) => {this.urlToBeShortened = ref}} onChange={ this.handleURLChange.bind(this) } value={this.state.urlToBeShortened}/>
                    </Col>
                    <Col md={1}>
                        <Button bsStyle="danger" className="shortenButton" 
                            onClick={ this.handleClickToShort.bind(this) } loading={ this.state.loading } disabled={this.state.urlToBeShortened === ''} >
                            Shorten this link
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
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