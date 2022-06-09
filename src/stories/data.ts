import { TARGET_LINKS_PROPS } from "../../test/mock/data";

export const SAMPLE_DN = 'root/logic/ns-[book]/app-[book-app]';

export const SAMPLE_PROPS_DATA = [
    {
        kind: 'dn-list',
        id: 'shared-with',
        title: 'Shared With',
        order: 5,
        config: [
            'root/logic/ns-[kubevious]/app-[kubevious-ui]/cont-[kubevious-ui]/configmap-[kubevious-mysql-client]',
            'root/logic/ns-[kube-system]/app-[calico-node]/launcher-[DaemonSet]',
            'root/logic/ns-[kube-system]/app-[calico-node]/vol-[Volumes]',
        ],
        tooltip: 'Other objects that also use this configuration.',
    },
    {
        kind: 'yaml',
        id: 'config',
        title: 'Config',
        tooltip: 'Kubernetes YAML Configuration',
        config: {
            name: 'gprod-addr-main-app',
            image:
                'gcr.io/berlioz-demo-gprod/addr-main-app@sha256:b5e6317de1171f784784f65f8b563c46c069dd6b3093547a3ee4f3cfb2ddb7e1',
            ports: [
                {
                    name: 'default',
                    containerPort: 4000,
                    protocol: 'TCP',
                },
            ],
            env: [
                {
                    name: 'BERLIOZ_TASK_ID',
                    valueFrom: {
                        fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.uid',
                        },
                    },
                },
                {
                    name: 'BERLIOZ_IDENTITY',
                    valueFrom: {
                        fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.name',
                        },
                    },
                },
                {
                    name: 'BERLIOZ_ADDRESS',
                    valueFrom: {
                        fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'status.podIP',
                        },
                    },
                },
                {
                    name: 'BERLIOZ_INSTANCE_ID',
                    valueFrom: {
                        fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'spec.nodeName',
                        },
                    },
                },
                {
                    name: 'BERLIOZ_HOST_IP',
                    valueFrom: {
                        fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'status.hostIP',
                        },
                    },
                },
                {
                    name: 'BERLIOZ_CONSUMES_PATH',
                    value: '/etc/berlioz/consumes',
                },
                {
                    name: 'BERLIOZ_AGENT_PATH',
                    value: 'ws://${BERLIOZ_HOST_IP}:55555/${BERLIOZ_TASK_ID}',
                },
                {
                    name: 'BERLIOZ_LISTEN_ADDRESS',
                    value: '0.0.0.0',
                },
                {
                    name: 'BERLIOZ_INFRA',
                    value: 'k8s',
                },
                {
                    name: 'BERLIOZ_REGION',
                    value: 'us-west1',
                },
                {
                    name: 'BERLIOZ_CLUSTER',
                    value: 'addr',
                },
                {
                    name: 'BERLIOZ_SECTOR',
                    value: 'main',
                },
                {
                    name: 'BERLIOZ_SERVICE',
                    value: 'app',
                },
                {
                    name: 'BERLIOZ_IDENTITY_PREFIX',
                    value: 'gprod-addr-main-app-',
                },
                {
                    name: 'BERLIOZ_LISTEN_PORT_DEFAULT',
                    value: '4000',
                },
                {
                    name: 'BERLIOZ_PROVIDED_PORT_DEFAULT',
                    value: '4000',
                },
                {
                    name: 'GOOGLE_APPLICATION_CREDENTIALS',
                    value: '/var/secrets/google/service-key.json',
                },
                {
                    name: 'BERLIOZ_CONSUMED_CLUSTER_SPRT_DTREP_HOST',
                    value: 'gprod-sprt-main-dtrace-client',
                },
                {
                    name: 'BERLIOZ_CONSUMED_CLUSTER_SPRT_DTREP_PORT',
                    value: '80',
                },
                {
                    name: 'BERLIOZ_CONSUMED_CLUSTER_SPRT_DTREP_URL',
                    value: 'http://gprod-sprt-main-dtrace-client:80',
                },
            ],
            resources: {
                requests: {
                    cpu: '100m',
                    memory: '100Mi',
                },
            },
            volumeMounts: [
                {
                    name: 'google-cloud-key',
                    mountPath: '/var/secrets/google',
                },
                {
                    name: 'gprod-addr-main-app-consumes',
                    mountPath: '/etc/berlioz/consumes',
                },
                {
                    name: 'gprod-addr-main-app-consumesdatabase',
                    mountPath: '/etc/berlioz/consumes/database',
                },
            ],
            terminationMessagePath: '/dev/termination-log',
            terminationMessagePolicy: 'File',
            imagePullPolicy: 'IfNotPresent',
        },
    },
    {
        kind: 'key-value',
        id: 'env',
        title: 'Environment Variables',
        tooltip:
            'Environment variables applied to this container. Also contains variables defined in related ConfigMaps.',
        order: 10,
        config: {
            BERLIOZ_TASK_ID: '<pre>fieldRef:\n  apiVersion: v1\n  fieldPath: metadata.uid\n</pre>',
            BERLIOZ_IDENTITY: '<pre>fieldRef:\n  apiVersion: v1\n  fieldPath: metadata.name\n</pre>',
            BERLIOZ_ADDRESS: '<pre>fieldRef:\n  apiVersion: v1\n  fieldPath: status.podIP\n</pre>',
            BERLIOZ_INSTANCE_ID: '<pre>fieldRef:\n  apiVersion: v1\n  fieldPath: spec.nodeName\n</pre>',
            BERLIOZ_HOST_IP: '<pre>fieldRef:\n  apiVersion: v1\n  fieldPath: status.hostIP\n</pre>',
            BERLIOZ_CONSUMES_PATH: '/etc/berlioz/consumes',
            BERLIOZ_AGENT_PATH: 'ws://${BERLIOZ_HOST_IP}:55555/${BERLIOZ_TASK_ID}',
            BERLIOZ_LISTEN_ADDRESS: '0.0.0.0',
            BERLIOZ_INFRA: 'k8s',
            BERLIOZ_REGION: 'us-west1',
            BERLIOZ_CLUSTER: 'addr',
            BERLIOZ_SECTOR: 'main',
            BERLIOZ_SERVICE: 'app',
            BERLIOZ_IDENTITY_PREFIX: 'gprod-addr-main-app-',
            BERLIOZ_LISTEN_PORT_DEFAULT: '4000',
            BERLIOZ_PROVIDED_PORT_DEFAULT: '4000',
            GOOGLE_APPLICATION_CREDENTIALS: '/var/secrets/google/service-key.json',
            BERLIOZ_CONSUMED_CLUSTER_SPRT_DTREP_HOST: 'gprod-sprt-main-dtrace-client',
            BERLIOZ_CONSUMED_CLUSTER_SPRT_DTREP_PORT: '80',
            BERLIOZ_CONSUMED_CLUSTER_SPRT_DTREP_URL: 'http://gprod-sprt-main-dtrace-client:80',
        },
    },
    {
        kind: 'table',
        id: 'resource-role-matrix',
        title: 'Resource Role Matrix',
        order: 8,
        config: {
            headers: [
                {
                    id: 'api',
                    label: 'API Group',
                },
                {
                    id: 'resource',
                    label: 'Resource',
                },
                {
                    id: 'namespace',
                    label: 'Namespace',
                },
                {
                    id: 'name',
                    label: 'Name',
                },
                {
                    id: 'get',
                    kind: 'check',
                },
                {
                    id: 'list',
                    kind: 'check',
                },
                {
                    id: 'watch',
                    kind: 'check',
                },
                {
                    id: 'create',
                    kind: 'check',
                },
                {
                    id: 'update',
                    kind: 'check',
                },
                {
                    id: 'patch',
                    kind: 'check',
                },
            ],
            rows: [
                {
                    api: '',
                    resource: 'endpoints',
                    name: '*',
                    namespace: '*',
                    get: true,
                },
                {
                    api: '',
                    resource: 'namespaces',
                    name: '*',
                    namespace: '*',
                    get: true,
                    list: true,
                    watch: true,
                },
                {
                    api: '',
                    resource: 'nodes',
                    name: '*',
                    namespace: '*',
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: '',
                    resource: 'pods',
                    name: '*',
                    namespace: '*',
                    get: true,
                    list: true,
                    watch: true,
                    patch: true,
                },
                {
                    api: '',
                    resource: 'pods/status',
                    name: '*',
                    namespace: '*',
                    update: true,
                    patch: true,
                },
                {
                    api: '',
                    resource: 'serviceaccounts',
                    name: '*',
                    namespace: '*',
                    get: true,
                    list: true,
                    watch: true,
                },
                {
                    api: '',
                    resource: 'services',
                    name: '*',
                    namespace: '*',
                    get: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'bgpconfigurations',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'bgppeers',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'clusterinformations',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'felixconfigurations',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'globalbgpconfigs',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'globalfelixconfigs',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'globalnetworkpolicies',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'globalnetworksets',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'hostendpoints',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'ippools',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'crd.projectcalico.org',
                    resource: 'networkpolicies',
                    name: '*',
                    namespace: '*',
                    create: true,
                    get: true,
                    list: true,
                    update: true,
                    watch: true,
                },
                {
                    api: 'extensions',
                    resource: 'networkpolicies',
                    name: '*',
                    namespace: '*',
                    get: true,
                    list: true,
                    watch: true,
                },
                {
                    api: 'networking.k8s.io',
                    resource: 'networkpolicies',
                    name: '*',
                    namespace: '*',
                    watch: true,
                    list: true,
                },
            ],
        },
    },
    TARGET_LINKS_PROPS
];

export const SAMPLE_DN_2 = 'root/logic/ns-[longhorn-system]/app-[longhorn-driver-deployer]';

export const SAMPLE_PROPS_DATA_2 = [
    {
      "id": "labels",
      "kind": "key-value",
      "config": {}
    },
    {
      "id": "resources-per-pod",
      "kind": "key-value",
      "config": {
        "cpu": {
          "unit": "cores",
          "value": 0
        },
        "memory": {
          "unit": "bytes",
          "value": 0
        }
      }
    },
    {
      "id": "resources",
      "kind": "key-value",
      "config": {
        "cpu": {
          "unit": "cores",
          "value": 0
        },
        "memory": {
          "unit": "bytes",
          "value": 0
        }
      }
    },
    {
      "id": "cluster-consumption",
      "kind": "key-value",
      "config": {
        "cpu": {
          "unit": "%",
          "value": 0
        },
        "memory": {
          "unit": "%",
          "value": 0
        }
      }
    },
    {
      "id": "health",
      "kind": "workloads-health",
      "config": {
        "pods": {
          "perc": 100,
          "count": 1
        },
        "ready": {
          "perc": 0,
          "count": 0
        },
        "failed": {
          "perc": 0,
          "count": 0
        },
        "pending": {
          "perc": 100,
          "count": 1
        },
        "running": {
          "perc": 0,
          "count": 0
        },
        "unknown": {
          "perc": 0,
          "count": 0
        },
        "succeeded": {
          "perc": 0,
          "count": 0
        },
        "scheduling": {
          "perc": 0,
          "count": 0
        },
        "initializing": {
          "perc": 0,
          "count": 0
        },
        "waitingReady": {
          "perc": 0,
          "count": 0
        },
        "waitingConditions": {
          "perc": 0,
          "count": 0
        },
        "waitingContainersReady": {
          "perc": 0,
          "count": 0
        },
        "restartedPods": {
          "15min": 0,
          "1hr": 0,
          "8hr": 2,
          "1day": 2
        }
      }
    },
    {
      "id": "properties",
      "kind": "key-value",
      "config": {
        "Exposed": "No",
        "Volumes": 0,
        "Launcher": "Deployment",
        "Replicas": "1",
        "Container Count": 1,
        "Init Container Count": 1
      }
    },
    {
      "id": "target-links",
      "kind": "links",
      "config": {
        "image": [
          {
            "dn": "root/images/repo-[dockerhub]/image-[longhornio/longhorn-manager]/tag-[v0.8.1]/ns-[longhorn-system]/app-[longhorn-driver-deployer]",
            "path": "cont-longhorn-driver-deployer"
          },
          {
            "dn": "root/images/repo-[dockerhub]/image-[longhornio/longhorn-manager]/tag-[v0.8.1]/ns-[longhorn-system]/app-[longhorn-driver-deployer]",
            "path": "initcont-wait-longhorn-manager"
          }
        ]
      }
    },
    {
      "id": "pod-stages",
      "kind": "pods-versions-health",
      "config": {
        "versions": [
          {
            "pods": [
              {
                "dn": "root/logic/ns-[longhorn-system]/app-[longhorn-driver-deployer]/launcher-[Deployment]/replicaset-[58cffbd7fb]/pod-[dvj8k]",
                "date": "2021-10-14T22:48:47Z",
                "phase": "Pending",
                "conditions": []
              }
            ],
            "launcher": {
              "dn": "root/logic/ns-[longhorn-system]/app-[longhorn-driver-deployer]/launcher-[Deployment]/replicaset-[58cffbd7fb]",
              "date": "2021-10-14T22:48:47Z"
            }
          }
        ]
      }
    }
];


export const SAMPLE_DN_3 = 'root/logic/ns-[longhorn-system]/app-[longhorn-driver-deployer]';

export const SAMPLE_PROPS_DATA_3 = [
    {
      "id": "labels",
      "kind": "key-value",
      "config": {}
    },
    {
      "id": "resources-per-pod",
      "kind": "key-value",
      "config": {
        "cpu": {
          "unit": "cores",
          "value": 0
        },
        "memory": {
          "unit": "bytes",
          "value": 0
        }
      }
    },
    {
      "id": "resources",
      "kind": "key-value",
      "config": {
        "cpu": {
          "unit": "cores",
          "value": 0
        },
        "memory": {
          "unit": "bytes",
          "value": 0
        }
      }
    },
    {
      "id": "cluster-consumption",
      "kind": "key-value",
      "config": {
        "cpu": {
          "unit": "%",
          "value": 0
        },
        "memory": {
          "unit": "%",
          "value": 0
        }
      }
    },
    {
      "id": "health",
      "kind": "workloads-health",
      "config": {}
    },
    {
      "id": "properties",
      "kind": "key-value",
      "config": {
        "Exposed": "No",
        "Volumes": 0,
        "Launcher": "Deployment",
        "Replicas": "1",
        "Container Count": 1,
        "Init Container Count": 1
      }
    },
    {
      "id": "target-links",
      "kind": "links",
      "config": {
        "image": [
          {
            "dn": "root/images/repo-[dockerhub]/image-[longhornio/longhorn-manager]/tag-[v0.8.1]/ns-[longhorn-system]/app-[longhorn-driver-deployer]",
            "path": "cont-longhorn-driver-deployer"
          },
          {
            "dn": "root/images/repo-[dockerhub]/image-[longhornio/longhorn-manager]/tag-[v0.8.1]/ns-[longhorn-system]/app-[longhorn-driver-deployer]",
            "path": "initcont-wait-longhorn-manager"
          }
        ]
      }
    },
    {
      "id": "pod-stages",
      "kind": "pods-versions-health",
      "config": {
      }
    }
]