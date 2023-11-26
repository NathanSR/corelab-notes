import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
    allow: boolean;
    redirect?: string;
    children: React.ReactNode;
}

//allow: boolean que determina se rota será permitida
//redirect: caso haja erro, redirecionnar para outra rota
//children: rota privada a ser exibida; se não for passada, exibe outlet
const PrivateRoute: React.FC<PrivateRouteProps> = ({ allow, redirect = "/", children }) => {
    if (!allow) return <Navigate to={redirect} replace />;
    return (<>{children || <Outlet />}</>)
};

export default PrivateRoute;
