import { useState } from "react";
import type { UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues, ModelConstructor, TObject } from "@tntfx/core";

export type UseModelReturn<T extends TObject> = UseFormReturn<FormValues<T>>;

export function useModel<T extends TObject>(
  Model: ModelConstructor<T>,
  props: UseFormProps<FormValues<T>> = {}
): UseModelReturn<T> {
  const [model] = useState(() => new Model());

  const form = useForm<FormValues<T>>({
    resolver: zodResolver(model.schema),
    reValidateMode: "onChange",
    shouldFocusError: true,
    ...props,
  });

  return form;
}
