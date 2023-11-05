import type { PropsWithChildren } from "react";
import type { Any, Nullable } from "@tntfx/core";
import { act, fireEvent, render, screen } from "@tntfx/test";
import { initStore } from "./store";

type Location = {
  lat: number;
  lang: number;
};

type State = {
  value: string;
  names: string[];
  locations: Location[];
  selectedName?: string;
  selectedLocation: Nullable<Location>;
};

const initialState: State = {
  value: "first",
  names: [],
  locations: [],
  selectedLocation: null,
};

describe("initStore", () => {
  it("should update the store on changing the incoming state", () => {
    const { StoreProvider, useStore } = initStore<State>({ name: "testStore" });

    let stateValue: Any = null;
    let secondStateValue: Any = null;

    function Provider(props: PropsWithChildren<State>) {
      const { children, ...state } = props;

      return (
        <StoreProvider {...state}>
          <Consumer>{children}</Consumer>
        </StoreProvider>
      );
    }

    function SecondProvider(props: PropsWithChildren<State>) {
      const { children, ...state } = props;

      return (
        <StoreProvider {...state}>
          <Consumer>{children}</Consumer>
        </StoreProvider>
      );
    }

    function Consumer(props: PropsWithChildren) {
      const [state, setState] = useStore();

      if (state.value == "first") {
        stateValue = state;
      } else {
        secondStateValue = state;
      }

      return (
        <div>
          {props.children}

          <button onClick={() => setState({ selectedName: state.value })}>Change state</button>
        </div>
      );
    }

    const { rerender } = render(
      <Provider {...initialState}>
        <p>text child</p>
      </Provider>
    );
    expect(stateValue).toEqual(initialState);
    // expect(screen.getByText("text child")).toBeInTheDocument();

    rerender(<Provider {...initialState} selectedName="first" />);
    expect(stateValue).toEqual({ ...initialState, selectedName: "first" });

    render(
      <SecondProvider {...initialState} value="second">
        <p>second text</p>
      </SecondProvider>
    );
    expect(secondStateValue).toEqual({ ...initialState, value: "second" });

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);

    act(() => {
      fireEvent.click(buttons[0]);
    });
    expect(stateValue).toEqual({ ...initialState, value: "first", selectedName: "first" });
    expect(secondStateValue).toEqual({ ...initialState, value: "second" });

    act(() => {
      fireEvent.click(buttons[1]);
    });
    expect(stateValue).toEqual({ ...initialState, value: "first", selectedName: "first" });
    expect(secondStateValue).toEqual({ ...initialState, value: "second", selectedName: "second" });

    rerender(<Provider {...initialState} selectedName="first+" value="third" />);
    expect(stateValue).toEqual({ ...initialState, value: "first", selectedName: "first" });
    expect(secondStateValue).toEqual({ ...initialState, value: "third", selectedName: "first+" });
  });
});
