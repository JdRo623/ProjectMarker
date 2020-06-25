import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Cuestionario = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './cuestionario')
);
const Util = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './util')
);
const RutaAprendizaje = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './ruta_aprendizaje')
);

const CarguePreguntas = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './carga_preguntas')
);

const BuscarPreguntas = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './busqueda_pregunta')
);
const AgregarEmpleados = React.lazy(() => import('./agregar_empleados'));

const ConsultarCuestionario = React.lazy(() => import('./consultar_cuestionario'));

const PrincipalColaborador = React.lazy(() => import('./principal_colaborador'));


const Reportes = React.lazy(() =>
  import(/* webpackChunkName: "cuestionario" */ './reportes')
);

const PagesPic = ({ match }) => (
  <Suspense fallback={<div className='loading' />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/carguePreguntas`}
      />
      <Route
        path={`${match.url}/busquedaPregunta`}
        render={(props) => <BuscarPreguntas {...props} />}
      />
      <Route
        path={`${match.url}/cuestionario`}
        render={(props) => <Cuestionario {...props} />}
      />
      <Route
        path={`${match.url}/principal_colaborador`}
        render={(props) => <PrincipalColaborador {...props} />}
      />
      <Route
        path={`${match.url}/rutaAprendizaje`}
        render={(props) => <RutaAprendizaje {...props} />}
      />
      <Route
        path={`${match.url}/util`}
        render={(props) => <Util {...props} />}
      />
      <Route
        path={`${match.url}/carguePreguntas`}
        render={(props) => <CarguePreguntas {...props} />}
      />
      <Route
        path={`${match.url}/crear-empleado`}
        render={(props) => <AgregarEmpleados {...props} />}
      />
      <Route
        path={`${match.url}/consultar-cuestionario`}
        render={(props) => <ConsultarCuestionario {...props} />}
      />
      <Route
        path={`${match.url}/reportes`}
        render={(props) => <Reportes {...props} />}
      />
      <Redirect to='/error' />
    </Switch>
  </Suspense>
);
export default PagesPic;
