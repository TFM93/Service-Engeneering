import React from 'react';
import NewTicketStore from '../stores/NewTicketStore'
import NewTicketActions from '../actions/NewTicketActions'



class NewTicket extends ReactComponent {

    constructor(props) {
        super(props);
        this.state = NewTicketStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {
        NewTicketStore.listen(this.onChange);

    }

    componentWillUnmount() {
        NewTicketStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event){
        event.preventDefault();

        NewTicketActions.getNewTicket();

    }


    render() {
        return (
            <div class="container">
                <div class="col-md-12">
                    <form onSubmit={this.handleSubmit.bind(this)}>

                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input type="email" class="form-control" id="email" />
                        </div>
                        <div class="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" id="pwd" />
                        </div>
                        <div class="checkbox">
                            <label><input type="checkbox" /> Remember me</label>
                        </div>
                        <button type="submit" class="btn btn-default">Get Ticket</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default NewTicket;