<!-- Copyright (c) 2025 Apple Inc. Licensed under MIT License. -->
<script lang="ts">
  import Viewer from "./Viewer.svelte";

  import { BackendDataSource } from "./backend_data_source.js";

  // let serverUrl = "./data/";
  let serverUrl = "http://oreseek-ebdata.architecture-china.cn:8090/data";
  if (import.meta.env.MODE == "development") {
    // serverUrl = "http://localhost:5055/data/";
    serverUrl = "http://oreseek-ebdata.architecture-china.cn:8090/data";
  }

  let dataSource = new BackendDataSource(serverUrl);
</script>

<Viewer dataSource={dataSource} />
