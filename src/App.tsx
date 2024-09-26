import HomePage from "./components/pages/home/HomePage";
import LoginPage from "./components/pages/auth/LoginPage";
import AuthPage from "./components/pages/auth/AuthPage";
import AnimatedCursor from "react-animated-cursor";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./components/pages/auth/SignupPage";
import MyGallery from "./components/pages/MyGallery";
import ComedyShowPage from "./components/pages/videogen/ComedyShowPage";
import PricingPage from "./components/pages/PricingPage";
import WhatsNewPage from "./components/pages/WhatsNewPage";
import KidsMusicPage from "./components/pages/musicgen/KidsMusicPage";

function App() {
  return (
    <div id="" className="flex flex-col justify-center items-center overflow-x-hidden cursor-none">

      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} >
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/gallery" element={<MyGallery />} />
        <Route path="/comedy-show" element={<ComedyShowPage />} />
        <Route path="/kids-music" element={<KidsMusicPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/whats-new" element={<WhatsNewPage />} />
      </Routes>

      <AnimatedCursor
        innerSize={10}
        outerSize={10}
        color="255, 255, 255"
        outerAlpha={0.5}
        innerScale={1}
        outerScale={5}
        showSystemCursor={false}
        clickables={[
          "Link",
          "NavLink",
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />
    </div>
  );
}

export default App;
