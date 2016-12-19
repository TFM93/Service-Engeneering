import React from 'react';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
        this.onChange = this.onChange.bind(this);
    }


    componentDidMount() {
        LoginStore.listen(this.onChange);

    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var name = this.state.name.trim();
        var gender = this.state.gender;

        if (!name) {
            LoginActions.invalidName();
            this.refs.nameTextField.getDOMNode().focus();
        }

        if (!gender) {
            LoginActions.invalidGender();
        }

        if (name && gender) {
            LoginActions.Login(name, gender);
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row flipInX animated'>
                    <div className='col-sm-8'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Add Character</div>
                            <div className='panel-body'>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={'form-group ' + this.state.nameValidationState}>
                                        <label className='control-label'>Character Name</label>
                                        <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                                            onChange={LoginActions.updateName} autoFocus />
                                        <span className='help-block'>{this.state.helpBlock}</span>
                                    </div>
                                    <div className={'form-group ' + this.state.genderValidationState}>
                                        <div className='radio radio-inline'>
                                            <input type='radio' name='gender' id='female' value='Female' checked={this.state.gender === 'Female'}
                                                onChange={LoginActions.updateGender} />
                                            <label htmlFor='female'>Female</label>
                                        </div>
                                        <div className='radio radio-inline'>
                                            <input type='radio' name='gender' id='male' value='Male' checked={this.state.gender === 'Male'}
                                                onChange={LoginActions.updateGender} />
                                            <label htmlFor='male'>Male</label>
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Login;