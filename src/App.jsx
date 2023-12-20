import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { Suspense, lazy } from "react";

import Form from "./components/Form";
import CityList from "./components/CityList";
import CountriesList from "./components/CountryList";
import City from "./components/City";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import Login from "./Pages/Login";
// import AppLayout from "./Pages/AppLayout";
// import PageNotFound from "./Pages/PageNotFound";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

//before spliting code into smallchunks
// dist/assets/index-814b663a.css   31.90 kB │ gzip:   5.28 kB
// dist/assets/index-db09357b.js   532.04 kB │ gzip: 150.28 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<CityList />} />
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
