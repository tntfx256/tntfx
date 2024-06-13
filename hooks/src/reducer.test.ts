import type { Nullable } from "@tntfx/core";
import { act, renderHook } from "@tntfx/test";
import { createResetterAction, createSetterAction, useStateReducer } from "./reducer";

type Location = {
  lat: number;
  lang: number;
};

type State = {
  names: string[];
  locations: Location[];
  selectedName?: string;
  selectedLocation: Nullable<Location>;
};

const initialState: State = {
  names: [],
  locations: [],
  selectedLocation: null,
};

describe("useStateReducer", () => {
  it("should set/reset the state", () => {
    const { result } = renderHook(() => useStateReducer<State>(initialState));

    act(() => {
      result.current[1]({ locations: [{ lat: 1, lang: 1 }] });
    });
    let newState = { ...initialState, locations: [{ lat: 1, lang: 1 }] };
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1]({ selectedName: "John" });
    });
    newState = { ...newState, selectedName: "John" };
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1]({});
    });
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1]({ selectedName: undefined });
    });
    newState = { ...initialState, locations: [{ lat: 1, lang: 1 }] };
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1](createResetterAction());
    });
    expect(result.current[0]).toEqual(initialState);

    act(() => {
      result.current[1](createSetterAction(newState));
    });
    expect(result.current[0]).toEqual(newState);
  });

  it("should update state after mutating state", () => {
    const { result } = renderHook(() => useStateReducer<State>(initialState));

    act(() => {
      result.current[1]((state) => {
        state.locations.push({ lat: 1, lang: 1 });
      });
    });
    let newState = { ...initialState, locations: [{ lat: 1, lang: 1 }] };
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1]((state) => {
        state.locations[0].lat = 2;
      });
    });
    newState = { ...initialState, locations: [{ lat: 2, lang: 1 }] };
    expect(result.current[0]).toEqual(newState);
  });

  it("should update state with actions", () => {
    const { result } = renderHook(() => useStateReducer<State>(initialState));

    act(() => {
      result.current[1](() => {
        return { names: ["first", "second"] };
      });
    });
    let newState = { ...initialState, names: ["first", "second"] };
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1]((state) => {
        state.names.splice(1, 1, "third");
      });
    });
    newState = { ...initialState, names: ["first", "third"] };
    expect(result.current[0]).toEqual(newState);

    act(() => {
      result.current[1](() => {
        return createResetterAction();
      });
    });
    expect(result.current[0]).toEqual(initialState);
  });
});
