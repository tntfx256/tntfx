import { useState } from "react";
import type { UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues, ModelConstructor } from "@tntfx/core";

export type UseModelReturn<T extends object> = UseFormReturn<FormValues<T>>;

export function useModel<T extends object>(
  Model: ModelConstructor<T>,
  props: UseFormProps<FormValues<T>> = {}
): UseModelReturn<T> {
  const [model] = useState(() => new Model());

  const form = useForm<FormValues<T>>({
    resolver: zodResolver(model.schema),
    reValidateMode: "onChange",
    ...props,
  });

  return form;
}
