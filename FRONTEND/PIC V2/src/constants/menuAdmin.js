const data = [
  {
    /* id: "gogo",
     icon: "iconsminds-air-balloon-1",
     label: "menu.gogo",
     to: "/app/gogo",
     subs: [
       {
         icon: "simple-icon-paper-plane",
         label: "menu.start",
         to: "/app/gogo/start"
       }     
     ]
   },
   {*/

    //DESBLOQUEAR
    id: "secondmenu",
    icon: "iconsminds-administrator",
    label: "menu.administrador",
    to: "/app/second-menu",
    subs: [
      {
        icon: "iconsminds-upload",
        label: "menu.carga-archivos",
        to: "/app/pic/util",
      },
      {
        icon: "iconsminds-upload",
        label: "menu.reportes",
        to: "/app/pic/reportes",
      },
      {
        icon: "simple-icon-question",
        label: "menu.cargue-preguntas",
        to: "/app/pic/carguePreguntas",
      },
      {
        icon: "simple-icon-question",
        label: "menu.busqueda-preguntas",
        to: "/app/pic/busquedaPregunta",
      },
      {
        icon: "iconsminds-handshake",
        label: "menu.crear-empleado",
        to: "/app/pic/crear-empleado",
      },
      {
        icon: "iconsminds-handshake",
        label: "menu.consultar-cuestionario",
        to: "/app/pic/consultar-cuestionario",
      },
    ],
  } /*,
        icon: 'iconsminds-handshake',
        label: 'menu.crear-empleado',
        to: '/app/pic/crear-empleado',
      },
    ],
  } /*,
  {
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow:true
  }*/,
];
export default data;
