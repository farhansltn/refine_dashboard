import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register, CompanyList } from './pages'


import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { GraphQLClient } from "@refinedev/nestjs-query";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";
import List from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";

const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
            <AntdApp>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider}
                  liveProvider={liveProvider}
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  resources={resources}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "8NrWSV-ZFurw7-MTq5CX",
                    liveMode: "auto",
                  }}
                >
                  <Routes>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route
                      element={
                      <Authenticated
                        key='authenticated-layout'
                        fallback={<CatchAllNavigate to="/login"/>}
                      >
                          <Layout>
                            <Outlet/>
                          </Layout>
                        </Authenticated>
                      }>
                        <Route index element={<Home/>}/>
                        <Route path="/companies">
                          <Route index element={<CompanyList/>}/>
                          <Route path='new' element={<Create/>}/>
                          <Route path='edit/:id' element={<Edit/>}/>
                        </Route>
                        <Route path='/tasks' element={
                          <List>
                            <Outlet/>
                          </List>}
                          >
                            <Route path='new' element={<CreateTask/>}/>
                            <Route path='edit/:id' element={<EditTask/>}/>
                        </Route>
                    </Route>
                  </Routes>
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </AntdApp>
    </BrowserRouter>
  );
}

export default App;
