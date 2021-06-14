import "./App.css";
import Student from "./containers/Student/Student";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <h2>Sidebar</h2>
        </div>
        <div className="col-md-10">
          <Student />
        </div>
       </div>
    </div>
  );
}

export default App;
