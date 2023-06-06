import React from "react";
import { VueStoreModules } from "./../main";

type HelloWorldProps = {
 title: string;
 respondFunction: () => void;
};

function changeUserName() {
  VueStoreModules.user.setUser({
    ...VueStoreModules.user.getUser!,
    name: 'React Editted Username'
  })
}

export function HelloWorld({ title, respondFunction }: HelloWorldProps) {
  return <div>
    <h2>Vue prop to react: </h2>
      {title}
    <br />
    <button onClick={() => changeUserName()}>React Button</button>
    <button onClick={() => respondFunction()}>React emit function to Vue</button>

    <h2>asdasdasdas</h2>
  </div>
}