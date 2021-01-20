import Header from './components/Header';
import { UserForm } from './components/UserForm';

import './styles/App.scss';

function App() {
  return (
    <div className="app">
      <Header/>
      <UserForm />
    </div>
  );
}

export default App;
