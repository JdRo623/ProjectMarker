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
    id: 'blankpage',
    icon: 'simple-icon-user',
    label: 'menu.colaborador',
    to: '/app/second-menu/second',
    subs: [
      {
        icon: 'simple-icon-question',
        label: 'menu.cuestionario',
        to: '/app/pic/cuestionario',
      },
      {
        icon: 'iconsminds-arrow-outside-gap-45',
        label: 'menu.ruta-aprendizaje',
        to: '/app/pic/rutaAprendizaje',
      },
    ],
  },
  {
    id: 'secondmenu',
    icon: 'iconsminds-administrator',
    label: 'menu.administrador',
    to: '/app/second-menu',
    subs: [
      {
        icon: 'iconsminds-upload',
        label: 'menu.carga-archivos',
        to: '/app/pic/util',
      },
      {
        icon: 'iconsminds-upload',
        label: 'menu.reportes',
        to: '/app/pic/reportes',
      },
      {
        icon: 'simple-icon-question',
        label: 'menu.cargue-preguntas',
        to: '/app/pic/carguePreguntas',
      },
      {
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
