import React from "react";
import { Button, Popover, PopoverBody } from "reactstrap";

export class PopoverItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  };

  render() {
    return (
      <span>
        <Button
          className="mr-1 mb-2"
          color={this.props.color}
          id={"Popover-" + this.props.idCurso}
          onClick={this.toggle}
        >
          {this.props.nombreCurso}
        </Button>
        <Popover
          placement="top"
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.idCurso}
          toggle={this.toggle}
        >
          <PopoverBody>{this.props.idCurso+" - "+this.props.nombreCurso+": "+this.props.estado}</PopoverBody>
        </Popover>
      </span>
    );
  }
}
export default PopoverItem;
