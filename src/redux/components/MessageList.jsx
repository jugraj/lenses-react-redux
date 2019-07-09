import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { List, AutoSizer } from "react-virtualized";
import { Action } from "../actions";
import ListItemDetails from "./ListItemDetails";

export class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this.onShowRowDetails = this.onShowRowDetails.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);

        this.state = {
            message: {},
            allMessages: []
        };
    }

    componentDidUpdate(nextProps) {
        if (nextProps.messages !== this.props.messages) {
            this.setState({ allMessages: this.props.messages });
        }
        if (Object.keys(this.state.message).length === 0) {
            this.list.scrollToRow(this.props.messages.length);
        }
    }

    onShowRowDetails = d => {
        this.setState({ message: d });
    };

    rowRenderer = messages => ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
    }) => {
        let arr = [],
            keys = [];
        Object.keys(JSON.parse(messages[index].key)).forEach(function(k) {
            keys.push({ label: k, value: JSON.parse(messages[index].key)[k] });
        });
        Object.keys(JSON.parse(messages[index].value)).forEach(function(k) {
            arr.push({ label: k, value: JSON.parse(messages[index].value)[k] });
        });
        return (
            <div
                key={key}
                style={style}
                className="message-row columns ws-message-list is-multiline"
                onClick={this.onShowRowDetails.bind(this, messages[index])}
            >
                <div className="column is-2">
                    <div>Index</div>
                    {index}
                </div>
                {keys.map(item => (
                    <MessageListItem
                        className="key"
                        key={item.label}
                        label={item.label}
                        value={item.value}
                    />
                ))}
                {arr.map(item => (
                    <MessageListItem
                        key={item.label}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </div>
        );
    };

    onListItemSearch = e => {
        e.preventDefault();
        const { messages } = this.props;
        const filteredMessages = messages.filter(({ value }) => {
            const vals = JSON.parse(value);
            return Object.keys(vals).some(key =>
                vals[key]
                    .toString()
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        });
        this.setState({ allMessages: filteredMessages });
    };

    render() {
        const { messages, onCommitMessage } = this.props;
        const { onShowRowDetails } = this;
        const { message, allMessages } = this.state;

        return (
            <div>
                <div className="panel" style={{ marginTop: "20px" }}>
                    <div className="column is-6">
                        <input
                            className="input"
                            type="text"
                            placeholder="Search an item by any key value"
                            onChange={e => this.onListItemSearch(e)}
                        />
                    </div>
                    <div className="column">
                        Showing {allMessages.length} of {messages.length}
                    </div>
                </div>
                <ListItemDetails
                    message={message}
                    onCommitMessage={onCommitMessage}
                    onShowRowDetails={onShowRowDetails}
                />
                <nav className="panel">
                    <div className="panel-block">
                        <AutoSizer className="autosizer-bulma-fix">
                            {({ height, width, disableHeight = true }) => (
                                <List
                                    ref={list => {
                                        this.list = list;
                                    }}
                                    width={width}
                                    height={290}
                                    rowCount={allMessages.length}
                                    rowHeight={160}
                                    rowRenderer={this.rowRenderer(allMessages)}
                                />
                            )}
                        </AutoSizer>
                    </div>
                </nav>
            </div>
        );
    }
}

class MessageListItem extends React.Component {
    render() {
        return (
            <div className="column is-2">
                <div>{this.props.label}</div>
                {this.props.value}
            </div>
        );
    }
}

MessageList.defaultProps = {};

MessageList.propTypes = {
    onCommitMessage: PropTypes.func,
    message: PropTypes.object
};

const mapStateToProps = state => ({
    message: state.session.message,
    messages: state.session.messages
});

const mapDispatchToProps = {
    ...Action
};

export const MessageListComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);
