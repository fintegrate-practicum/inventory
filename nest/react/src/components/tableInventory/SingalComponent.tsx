import {Component} from '../../App'

 const SingalComponent: React.FunctionComponent< {component:Component}> = ({ component }) => {
    return (
        <div>
        <div>Name: {component.name}</div>
        <div>Price: {component.price}</div>
      </div>
    );
  }
   export default SingalComponent;