import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";

const DataListView = ({ curso, product, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={curso.idCurso} collect={collect}>
        <Card
          onClick={event => onCheckItem(event, curso.idCurso)}
          className={classnames("d-flex flex-row", {
            active: isSelect
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${curso.idCurso}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {curso.nombreCurso}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {curso.competencia}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {curso.nivel}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={curso.colorEstado} pill>
                  {curso.estado}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
