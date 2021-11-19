import React, { Component } from "react";
// @ts-ignore
import { useMediaQuery } from "react-responsive";
import { isThisTypeNode } from "typescript";
import { MOBILEWIDTH } from "../../config";

export const Desktop = ({ children }: { children: JSX.Element }) => {
  const isDesktop = useMediaQuery({ minWidth: MOBILEWIDTH });
  return isDesktop ? children : null;
};

export const Mobile = ({ children }: { children: JSX.Element }) => {
  const isMobile = useMediaQuery({ maxWidth: MOBILEWIDTH });
  return isMobile ? children : null;
};

export const Custom = (props: { maxWidth?: number; minWidth?: number }) => {
  const Custom$ = ({ children }: { children: JSX.Element }) => {
    const isMobile = useMediaQuery({
      maxWidth: props.maxWidth,
      minWidth: props.minWidth,
    });
    return isMobile ? children : null;
  };

  return Custom$;
};
