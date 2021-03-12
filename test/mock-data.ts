import { Group } from "../src"

export const KEY_VALUE_PROPS : Group = {
  "kind": "key-value",
  "id": "properties",
  "title": "Properties",
  "order": 5,
  "config": {
    "StorageClass": "standard",
    "Status": "Bound",
    "Finalizers": ["kubernetes.io/pvc-protection"],
    "Capacity Requested": "8Gi",
    "Capacity Provided": "8Gi",
    "Access Modes": ["ReadWriteOnce"],
    "Volume Mode": "Filesystem",
    "cpu": { "value": 0.26269430051813475, "unit": "%" },
    "memory": { "value": 0.0882509134239568, "unit": "%" }
  }
}

export const YAML_PROPS : Group = {
  "kind": "yaml",
  "id": "config",
  "title": "Config",
  "order": 10,
  "config": {
    "apiVersion": "v1",
    "kind": "PersistentVolumeClaim",
    "metadata": {
      "annotations": {
        "pv.kubernetes.io/bind-completed": "yes",
        "pv.kubernetes.io/bound-by-controller": "yes",
        "volume.beta.kubernetes.io/storage-provisioner": "kubernetes.io/gce-pd"
      },
      "creationTimestamp": "2020-01-18T00:50:38Z",
      "finalizers": ["kubernetes.io/pvc-protection"],
      "labels": {
        "app": "redis",
        "name": "redis-server",
        "redis-node": "true",
        "release": "gitlab"
      },
      "name": "data-gitlab-redis-server-1",
      "namespace": "gitlab",
      "resourceVersion": "2018939",
      "selfLink": "/api/v1/namespaces/gitlab/persistentvolumeclaims/data-gitlab-redis-server-1",
      "uid": "8b2d52c7-398c-11ea-b115-42010a8001d6"
    },
    "spec": {
      "accessModes": ["ReadWriteOnce"],
      "resources": { "requests": { "storage": "8Gi" } },
      "storageClassName": "standard",
      "volumeMode": "Filesystem",
      "volumeName": "pvc-8b2d52c7-398c-11ea-b115-42010a8001d6"
    },
    "status": {
      "accessModes": ["ReadWriteOnce"],
      "capacity": { "storage": "8Gi" },
      "phase": "Bound"
    }
  }
}