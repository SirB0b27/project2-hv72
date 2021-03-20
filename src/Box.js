import React from "react";
import { useState, useRef } from "react";
export function Box(props) {
  return (
    <div onClick={props.func} class="box">
      {props.val}
    </div>
  );
}
