import { ContextAggregator } from './global/contexts/aggregator';
import { defaultStyles } from './global/styles/defaultStyles';
import './global/styles/resetStyles/index.css';
import './global/styles/defaultStyles/defaultStyles.css';
import Home from './pages/Home';

function App() {
  defaultStyles();

  return (
    <ContextAggregator>
      <Home />
    </ContextAggregator>
  );
}

export default App;
