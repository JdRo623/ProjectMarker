import React, { Component, Fragment } from "react";
import axios from "axios";
import { Row, Card, CardBody, CardTitle, Table } from "reactstrap";

import { servicePath } from "../../../constants/defaultValues";

import RutaAprendizajeMock from "../../../data/pic/rutaApredizajeMock";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";

function collect(props) {
  return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

class DataListPages extends Component {
  constructor(props) {
    super(props);
    this.mouseTrap = require("mousetrap");

    this.state = {
      displayMode: "list",

      competencias: [],
      selectedPageSize: 10,
      orderOptions: [
        { column: "nombreCurso", label: "Nombre Curso" },
        { column: "competencia", label: "Competencia" },
        { column: "estado", label: "Estado" }
      ],
      pageSizes: [10, 20, 30, 50, 100],

      categories: [
        { label: "Competencia 1", value: "Competencia 1", key: 0 },
        { label: "Competencia 2", value: "Competencia 2", key: 1 },
        { label: "Competencia 3", value: "Competencia 3", key: 2 }
      ],

      selectedOrderOption: { column: "nombreCurso", label: "Nombre Curso" },
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false
    };
  }
  componentDidMount() {
    this.dataListRender();
    this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
      this.handleChangeSelectAll(false)
    );
    this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
      this.setState({
        selectedItems: []
      });
      return false;
    });
  }

  componentWillUnmount() {
    this.mouseTrap.unbind("ctrl+a");
    this.mouseTrap.unbind("command+a");
    this.mouseTrap.unbind("ctrl+d");
    this.mouseTrap.unbind("command+d");
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  };
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };
  changeDisplayMode = mode => {
    this.setState({
      displayMode: mode
    });
    return false;
  };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if (event.shiftKey) {
      var items = this.state.items;
      var start = this.getIndex(id, items, "idCurso");
      var end = this.getIndex(this.state.lastChecked, items, "idCurso");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map(item => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.setState({
        selectedItems
      });
    }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  handleChangeSelectAll = isToggle => {
    if (this.state.selectedItems.length >= this.state.items.length) {
      if (isToggle) {
        this.setState({
          selectedItems: []
        });
      }
    } else {
      this.setState({
        selectedItems: this.state.items.map(x => x.id)
      });
    }
    document.activeElement.blur();
    return false;
  };

  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    axios
      .get(
        `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${
        selectedOrderOption.column
        }&search=${search}`
      )
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(data)
        this.setState({
          totalPage: RutaAprendizajeMock.numeroTotalPagina,
          items: RutaAprendizajeMock.competencias,
          competencias: RutaAprendizajeMock.competencias,
          selectedItems: [],
          totalItemCount: RutaAprendizajeMock.totalItems,
          isLoading: true
        });
      });
  }

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>
          <div className="disable-text-selection">
            <Row>
              <Colxx xxs="12">
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      Ruta de Aprendizaje
                    </CardTitle>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th>Competencia</th>
                          <th>Basico</th>
                          <th>Medio</th>
                          <th>Alto</th>
                          <th>Superior</th>
                        </tr>
                      </thead>
                      <tbody >
                        <tr color="white">
                        </tr>
                        {this.state.competencias.map(competencia => {
                          return (
                            <tr>
                              <td >
                                <center>
                                  {competencia.nombre_competencia}
                                </center>
                              </td>
                              <td >
                                {competencia.cursos_basicos.map(curso => {
                                  return (
                                    <ul>
                                      <li>
                                        <font color={curso.colorEstado}>
                                           {curso.nombreCurso}
                                        </font>
                                      </li>
                                    </ul>
                                  )
                                })}</td>
                              <td >
                                {competencia.cursos_medios.map(curso => {
                                  return (
                                    <ul>
                                      <li>
                                        <font color={curso.colorEstado}>
                                           {curso.nombreCurso}
                                        </font>
                                      </li>
                                    </ul>
                                  )
                                })}</td>
                              <td>
                                {competencia.cursos_alto.map(curso => {
                                  return (
                                    <ul>
                                      <li>
                                        <font color={curso.colorEstado}>
                                           {curso.nombreCurso}
                                        </font>
                                      </li>
                                    </ul>
                                  )
                                })}</td>
                              <td >
                                {competencia.cursos_superior.map(curso => {
                                  return (
                                    <ul>
                                      <li>
                                        <font color={curso.colorEstado}>
                                           {curso.nombreCurso}
                                        </font>
                                      </li>
                                    </ul>
                                  )
                                })}</td>
                            </tr>
                          )
                        })}{" "}

                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Colxx>
              
            </Row>
          </div>
        </Fragment>
      );
  }
}
export default DataListPages;