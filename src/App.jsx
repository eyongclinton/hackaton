import "./App.css";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import CreateNews from "./Components/News";
import NewsDisplay from "./Components/NewsDisplay";
import CreateBuss from "./Components/Bus";
import PaymentForm from "./Components/PaymentForm";
import NotFound from "./Components/NotFound";
import ReminderSetting from "./Components/RemindersItem.jsx";

export default function App() {
  return (
    <Router>
      <main>
        <Link to="/payment">Payment</Link>
        <Link to="/">Register</Link>
        <Link to="/alarm-setting">Alarm Setting</Link>
        <Link to="/create-news">Create News</Link>
        <Link to="/news-display">News Display</Link>
        <Link to="/create-bus">Create Bus</Link>
        <Routes>
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/" element={<Register />} />

          <Route path="/create-news" element={<CreateNews />} />
          <Route path="/news-display" element={<NewsDisplay />} />
          <Route path="/create-bus" element={<CreateBuss />} />
          <Route path="/reminder" element={<ReminderSetting />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}
