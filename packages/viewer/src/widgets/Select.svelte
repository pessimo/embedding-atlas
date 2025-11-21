<!-- Copyright (c) 2025 Apple Inc. Licensed under MIT License. -->
<script lang="ts">
  import { get } from "svelte/store";
  import { externalParamsStore } from "../utils/postmessage.js";
  import SelectBase, { type Props as BaseProps } from "./SelectBase.svelte";

  type Props = BaseProps & {
    label?: string | null | undefined;
    /**
     * Select 组件的唯一标识符
     * 如果提供了 id，组件会从外部 postMessage 参数中读取对应的值
     */
    id?: string | null | undefined;
  };

  let props: Props = $props();

  let className =
    "form-select rounded-md py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 dark:text-slate-400 select-none text-ellipsis";

  // 如果提供了 id，从外部参数 store 中读取值
  let externalParams = $state(get(externalParamsStore));

  // 监听外部参数变化
  $effect(() => {
    if (!props.id) return;

    const unsubscribe = externalParamsStore.subscribe((params) => {
      externalParams = params;
      const key = `select_${props.id}`;
      const newValue = params[key];

      // 如果外部值变化且与当前 props.value 不同，触发 onChange
      if (newValue !== undefined && newValue !== props.value && props.onChange) {
        props.onChange(newValue);
      }
    });

    return unsubscribe;
  });

  // 计算外部值
  let externalValue = $derived.by(() => {
    if (!props.id) return undefined;
    const key = `select_${props.id}`;
    return externalParams[key];
  });

  // 计算有效值：如果外部有值则使用外部值，否则使用 props.value
  let effectiveValue = $derived(externalValue !== undefined ? externalValue : props.value);

  // 处理用户手动选择
  function handleChange(value: any) {
    console.log(value, "value");
    if (props.onChange) {
      props.onChange(value);
    }
  }
</script>

{#if props.label != null}
  <label class="select-none flex items-center gap-2">
    <span class="text-slate-500 dark:text-slate-400 whitespace-nowrap">{props.label}</span>
    <SelectBase
      {...props}
      value={effectiveValue}
      onChange={handleChange}
      class={className + " " + (props.class ?? "")}
    />
  </label>
{:else}
  <SelectBase {...props} value={effectiveValue} onChange={handleChange} class={className + " " + (props.class ?? "")} />
{/if}
