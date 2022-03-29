// Style Files
import "./App.css";
import "./sass/main.scss";

import { Switch, HashRouter, Route } from "react-router-dom";

// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Layout
import Header from "./components/header/Header";
import LoginPage from "./pages/login/LoginPage";

// Page
import Layout from "./components/Layout";
import Services from "./pages/services/Services";
import CreateServices from "./pages/services/CreateServices";
import User from "./pages/User/User";
import EditUser from "./pages/User/EditUser";
import CreateUser from "./pages/User/CreateUser";
import StaticContent from "./pages/StaticContent/StaticContent";
import EditServices from "./pages/services/EditServices";
import PageHeader from "./pages/PageHeader/PageHeader";
import EditPageHeader from "./pages/PageHeader/EditPageHeader";
import Slider from "./pages/Slider/Slider";
import CreateSlider from "./pages/Slider/CreateSlider";
import ClientCategory from "./pages/ClientCategory/ClientCategory";
import CreateClientCategory from "./pages/ClientCategory/CreateClientCategory";
import EditClientCategory from "./pages/ClientCategory/EditClientCategory";
import Clients from "./pages/Clients/Clients";
import EditClients from "./pages/Clients/EditClients";
import CreateClients from "./pages/Clients/CreateClients";
import Partitions from "./pages/Partitions/Partitions";
import EditPartitions from "./pages/Partitions/EditPartitions";
import Card from "./pages/Card/Card";
import EditCard from "./pages/Card/EditCard";
import CreateCard from "./pages/Card/CreateCard";

function App() {
  require("dotenv").config();
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <HashRouter basename="/">
        <PersistGate persistor={persistor}>
          <div className="main-app" dir="ltr">
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={(props) => <LoginPage {...props} />}
              />
              <Layout>
                <Route
                  exact
                  path="/Users"
                  component={(props) => <User {...props} />}
                />
                <Route
                  exact
                  path="/Users/CreateUser"
                  component={(props) => <CreateUser {...props} />}
                />
                <Route
                  exact
                  path="/Users/EditUser/:id"
                  component={(props) => <EditUser {...props} />}
                />
                <Route
                  exact
                  path="/Services"
                  component={(props) => <Services {...props} />}
                />
                <Route
                  exact
                  path="/Services/CreateServices"
                  component={(props) => <CreateServices {...props} />}
                />
                <Route
                  exact
                  path="/Services/EditServices/:id"
                  component={(props) => <EditServices {...props} />}
                />
                <Route
                  exact
                  path="/StaticContent"
                  component={(props) => <StaticContent {...props} />}
                />
                <Route
                  exact
                  path="/PageHeader"
                  component={(props) => <PageHeader {...props} />}
                />
                <Route
                  exact
                  path="/PageHeader/EditPageHeader/:id"
                  component={(props) => <EditPageHeader {...props} />}
                />
                <Route
                  exact
                  path="/Slider"
                  component={(props) => <Slider {...props} />}
                />
                <Route
                  exact
                  path="/Slider/CreateSlider"
                  component={(props) => <CreateSlider {...props} />}
                />

                <Route
                  exact
                  path="/Clients"
                  component={(props) => <Clients {...props} />}
                />
                <Route
                  exact
                  path="/Clients/CreateClients"
                  component={(props) => <CreateClients {...props} />}
                />
                <Route
                  exact
                  path="/Clients/EditClients/:id"
                  component={(props) => <EditClients {...props} />}
                />
                <Route
                  exact
                  path="/ClientCategory"
                  component={(props) => <ClientCategory {...props} />}
                />
                <Route
                  exact
                  path="/ClientCategory/CreateClientCategory"
                  component={(props) => <CreateClientCategory {...props} />}
                />
                <Route
                  exact
                  path="/ClientCategory/EditClientCategory/:id"
                  component={(props) => <EditClientCategory {...props} />}
                />
                <Route
                  exact
                  path="/Partitions"
                  component={(props) => <Partitions {...props} />}
                />
                <Route
                  exact
                  path="/Partitions/EditPartitions/:id"
                  component={(props) => <EditPartitions {...props} />}
                />
                <Route
                  exact
                  path="/Card"
                  component={(props) => <Card {...props} />}
                />
                <Route
                  exact
                  path="/Card/CreateCard"
                  component={(props) => <CreateCard {...props} />}
                />
                <Route
                  exact
                  path="/Card/EditCard/:id"
                  component={(props) => <EditCard {...props} />}
                />
              </Layout>
            </Switch>
          </div>
        </PersistGate>
      </HashRouter>
    </Provider>
  );
}

export default App;
