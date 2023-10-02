import './App.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import SideBar from "./components/components/SideBar";
import { Navigate, Routes } from "react-router";
import InstallablePackages from "./components/pages/InstallablePackages";
import PageNotFound from "./components/components/auth/PageNotFound";
import Versionstack from "./components/pages/Versionstack";
import Installables from "./components/pages/Installables";
import Home, { HomeButton } from "./components/pages/Home";
import ExportConfig from "./components/pages/ExportConfig";
import Import from "./components/pages/Import";
import { QueryClient, QueryClientProvider } from 'react-query';
import LoginButton from "./components/components/auth/LoginButton";
import { useAuth } from "react-oidc-context"
import { AuthProvider } from "react-oidc-context"
import React, { createContext, useContext, useState } from "react";
import {AlertSnackbars} from "./components/components/ExportData";
import GoAway from "./components/components/auth/GoAway";
import CircularProgress from "@mui/material/CircularProgress";

const oidcConfig = {
    authority: "https://login.test.doka.com/",
    client_id: "9d71a618-5337-4bff-b8b0-3e236e73e5ea",
    token_type: "Bearer",
    redirect_uri: "http://localhost:3000",
    scope: "dfdsin.doka.com/download openid profile email roles",
    post_logout_redirect_uri: "http://localhost:3000/login"
}

const query = new QueryClient();
export const TokenContext = createContext(null);

function App() {

    const [access_token, setAccess_token] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const auth = useAuth();

    const IsAuthenticated = () => {
        if (window.location.href.includes('code')) {
            setTimeout(() => {
                window.location.href = window.location.origin;
            }, 600);
        }

        if (auth.isLoading) {
            return <div className="box loadingBox"><CircularProgress className="loading"/></div>;
        }

        if (auth.error) {
            // console.log(isAuth);
            // console.log(auth.isAuthenticated);
            // console.log(auth.error.message);
            /*return `Oops... ${auth.error.message}`*/
            return null;
        }

        // console.log(auth.isAuthenticated);

        if (auth.isAuthenticated) {
            const token = 'Bearer ' + auth.user.access_token;
            setAccess_token(token);
            localStorage.setItem('access_token', token);

            return (
                <SideBar />
            )
        } else {
            if (window.location.href !== `${window.location.origin}/login`) {
                return window.location.replace(`${window.location.origin}/login`);
            }

        }
    }

    return (
        <AuthProvider {...oidcConfig}>
            <BrowserRouter>
                {/* <HomeButton /> */}
                <Routes>
                    <Route path="/" element={auth.isAuthenticated && <Home />} />
                    <Route path="/login" element={auth.isAuthenticated ? <GoAway/> : <LoginButton />} />
                    <Route path="/installablePackages" element={
                    <QueryClientProvider client={query}>
                        <InstallablePackages />
                    </QueryClientProvider>
                    } />
                    <Route path="/import" element={
                        
                        <QueryClientProvider client={query}>
                            <Import />
                        </QueryClientProvider>
                    } />
                    <Route path="/export"
                        element={
                            <QueryClientProvider client={query}>
                                <ExportConfig />
                            </QueryClientProvider>
                        }
                    />
                    <Route path="/versionstack" element={
                        <QueryClientProvider client={query}>
                            <Versionstack />
                        </QueryClientProvider>
                    }
                    />
                    <Route path="/installables" element={<Installables />} />
                    <Route exact path='*' element={<PageNotFound />} />
                </Routes>
                <IsAuthenticated />
            </BrowserRouter>
        </AuthProvider>

    );
}

export default App;