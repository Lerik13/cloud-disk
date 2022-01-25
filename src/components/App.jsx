import Navbar from "./navbar/Navbar";
import './app.css';

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Navbar />
			</div>
		</BrowserRouter>
	);
}

export default App;
