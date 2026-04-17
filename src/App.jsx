import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import QuizWidget from './pages/QuizWidget';
import SummaryWidget from './pages/SummaryWidget';
import StudyHistory from './pages/StudyHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<ChatInterface />} />
          <Route path="quiz" element={<QuizWidget />} />
          <Route path="summary" element={<SummaryWidget />} />
          <Route path="history" element={<StudyHistory />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
