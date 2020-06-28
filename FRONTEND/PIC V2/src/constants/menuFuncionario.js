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
    id: "blankpage",
    icon: "simple-icon-user",
    label: "menu.colaborador",
    to: "/app/second-menu/second",
    subs: [
      {
        icon: "simple-icon-question",
        label: "menu.principal_empleado",
        to: "/app/pic/principal_colaborador",
      },
      {
        icon: "simple-icon-question",
        label: "menu.cuestionario",
        to: "/app/pic/cuestionario",
      },
      {
        icon: "iconsminds-arrow-outside-gap-45",
        label: "menu.ruta-aprendizaje",
        to: "/app/pic/rutaAprendizaje",
      },
    ],
  }
];
export default data;
