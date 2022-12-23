import React, { FunctionComponent } from 'react';
import {Outlet} from "react-router-dom";

interface OwnProps {}

type Props = OwnProps;

const Root: FunctionComponent<Props> = (props) => {

  return (<Outlet/>);
};

export default Root;
