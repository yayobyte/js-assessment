import React, { PureComponent } from 'react';
import 'typeface-roboto';
import SignIn from '../SignIn/index';

class App extends PureComponent {
  state={
    loggedIn: false,
  };
  handleSubmit = () => {
    this.setState(() => ({ loggedIn: true }));
  };
  render() {
    const { handleSubmit } = this;
    const { loggedIn } = this.state;
    return (
      <div>
        {!loggedIn && <SignIn handleSubmit={handleSubmit}/>}
        Welcome
      </div>
    );
  }
}

export default App;
