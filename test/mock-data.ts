import { Group } from '../src';

export const KEY_VALUE_PROPS: Group = {
    kind: 'key-value',
    id: 'properties',
    title: 'Properties',
    order: 5,
    config: {
        StorageClass: 'standard',
        Status: 'Bound',
        Finalizers: ['kubernetes.io/pvc-protection'],
        'Capacity Requested': '8Gi',
        'Capacity Provided': '8Gi',
        'Access Modes': ['ReadWriteOnce'],
        'Volume Mode': 'Filesystem',
        cpu: { value: 0.26269430051813475, unit: '%' },
        memory: { value: 0.0882509134239568, unit: '%' },
    },
};

export const YAML_PROPS: Group = {
    kind: 'yaml',
    id: 'config',
    title: 'Config',
    order: 10,
    config: {
        apiVersion: 'v1',
        kind: 'PersistentVolumeClaim',
        metadata: {
            annotations: {
                'pv.kubernetes.io/bind-completed': 'yes',
                'pv.kubernetes.io/bound-by-controller': 'yes',
                'volume.beta.kubernetes.io/storage-provisioner': 'kubernetes.io/gce-pd',
            },
            creationTimestamp: '2020-01-18T00:50:38Z',
            finalizers: ['kubernetes.io/pvc-protection'],
            labels: {
                app: 'redis',
                name: 'redis-server',
                'redis-node': 'true',
                release: 'gitlab',
            },
            name: 'data-gitlab-redis-server-1',
            namespace: 'gitlab',
            resourceVersion: '2018939',
            selfLink: '/api/v1/namespaces/gitlab/persistentvolumeclaims/data-gitlab-redis-server-1',
            uid: '8b2d52c7-398c-11ea-b115-42010a8001d6',
        },
        spec: {
            accessModes: ['ReadWriteOnce'],
            resources: { requests: { storage: '8Gi' } },
            storageClassName: 'standard',
            volumeMode: 'Filesystem',
            volumeName: 'pvc-8b2d52c7-398c-11ea-b115-42010a8001d6',
        },
        status: {
            accessModes: ['ReadWriteOnce'],
            capacity: { storage: '8Gi' },
            phase: 'Bound',
        },
    },
};

export const COUNTERS_PROPS: Group = {
    kind: 'counters',
    id: 'infra-counters',
    title: 'Infrastructure Summary',
    order: 11,
    config: [
        {
            title: 'Nodes',
            value: 3,
        },
        {
            title: 'Volumes',
            value: 52,
        },
        {
            title: 'Cluster CPU',
            value: 3123.86,
            unit: 'cores',
        },
        {
            title: 'Cluster RAM',
            value: 11831631872,
            unit: 'bytes',
        },
    ],
};

export const OBJECT_LIST_PROPS: Group = {
    kind: 'object-list',
    id: 'top-issue-namespaces',
    title: 'Top Namespaces with Issues',
    order: 12,
    config: [
        {
            dn: 'root/ns-[kube-system]',
            alertCount: {
                error: 11,
                warn: 19,
            },
        },
        {
            dn: 'root/ns-[addr]',
            alertCount: {
                error: 16,
                warn: 1,
            },
        },
        {
            dn: 'root/ns-[test-webapp-backend]',
            alertCount: {
                error: 6,
                warn: 3,
            },
        },
    ],
};

export const ALERT_TARGET_LIST_PROPS: Group = {
    kind: 'alert-target-list',
    id: 'top-issues',
    title: 'Top Issues',
    order: 13,
    config: [
        {
            alert: {
                id: 'rule-container-memory-usage',
                severity: 'warn',
                msg:
                    'Rule container-memory-usage failed. Memory request is not set. This is not a good practice. Please correct ASAP.',
                source: {
                    kind: 'rule',
                    id: 'container-memory-usage',
                },
            },
            targets: [
                'root/ns-[kube-system]/app-[fluentd-gcp-v3.2.0]/cont-[prometheus-to-sd-exporter]',
                'root/ns-[kube-system]/app-[prometheus-to-sd]/cont-[prometheus-to-sd]',
                'root/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[event-exporter]',
                'root/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[prometheus-to-sd-exporter]',
                'root/ns-[kube-system]/app-[fluentd-gcp-scaler]/cont-[fluentd-gcp-scaler]',
                'root/ns-[kube-system]/app-[heapster]/cont-[heapster]',
                'root/ns-[kube-system]/app-[heapster]/cont-[prom-to-sd]',
                'root/ns-[kube-system]/app-[kube-dns]/cont-[prometheus-to-sd]',
                'root/ns-[addr]/app-[gprod-addr-main-app]/cont-[cloudsql-proxy-gprod-addr-uswest1c-main-book]',
                'root/ns-[test-ingress-isolated-ns-01]/app-[nginx]/cont-[nginx]',
                'root/ns-[test-ingress-isolated-ns-02]/app-[nginx]/cont-[nginx]',
                'root/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                'root/ns-[test-ingress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                'root/ns-[test-egress-isolated-ns]/app-[nginx]/cont-[nginx]',
                'root/ns-[test-egress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                'root/ns-[test-egress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                'root/ns-[test-webapp-backend]/app-[db]/cont-[nginx]',
                'root/ns-[test-webapp-backend]/app-[backend]/cont-[nginx]',
                'root/ns-[test-webapp-backend]/app-[logger]/cont-[nginx]',
                'root/ns-[test-webapp-frontend]/app-[frontend]/cont-[nginx]',
            ],
        },
        {
            alert: {
                id: 'Unused',
                severity: 'warn',
                msg: 'ConfigMap not used.',
                source: {
                    kind: 'parser',
                },
            },
            targets: [
                'root/ns-[berlioz]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[sql-schema]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-10]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-11]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-12]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-galley-configuration]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security-custom-resources]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-sidecar-injector]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio]',
                'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[prometheus]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[berlioz.v1]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[cluster-autoscaler-status]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[extension-apiserver-authentication]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[fluentd-gcp-config-v1.2.5]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[gke-common-webhook-lock]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-gce-lock]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-uid]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-init.v1]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio.v1]',
                'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[kube-dns-autoscaler]',
            ],
        },
        {
            alert: {
                id: 'Missing',
                severity: 'error',
                msg: 'Service account default is not found.',
                source: {
                    kind: 'parser',
                },
            },
            targets: [
                'root/ns-[berlioz]/app-[gprod-berlioz-main-agent]',
                'root/ns-[kube-system]/app-[nvidia-gpu-device-plugin]',
                'root/ns-[addr]/app-[gprod-addr-main-app]',
                'root/ns-[addr]/app-[gprod-addr-main-web]',
                'root/ns-[sprt]/app-[gprod-sprt-main-dtrace]',
                'root/ns-[sprt]/app-[gprod-sprt-main-grfna]',
                'root/ns-[sprt]/app-[gprod-sprt-main-prmts]',
                'root/ns-[kube-system]/app-[l7-default-backend]',
                'root/ns-[test-ingress-isolated-ns-01]/app-[nginx]',
                'root/ns-[test-ingress-isolated-ns-02]/app-[nginx]',
                'root/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]',
                'root/ns-[test-ingress-isolated-pod]/app-[open-nginx]',
                'root/ns-[test-egress-isolated-ns]/app-[nginx]',
                'root/ns-[test-egress-isolated-pod]/app-[isolated-nginx]',
                'root/ns-[test-egress-isolated-pod]/app-[open-nginx]',
                'root/ns-[test-webapp-backend]/app-[db]',
                'root/ns-[test-webapp-backend]/app-[backend]',
                'root/ns-[test-webapp-backend]/app-[logger]',
                'root/ns-[test-webapp-frontend]/app-[frontend]',
            ],
        },
    ],
};

export const DN_LIST_PROPS = {
    kind: 'dn-list',
    id: 'shared-with',
    title: 'Shared With',
    order: 5,
    config: [
        'root/ns-[kubevious]/app-[kubevious-ui]/cont-[kubevious-ui]/configmap-[kubevious-mysql-client]',
        'root/ns-[kube-system]/app-[calico-node]/launcher-[DaemonSet]',
        'root/ns-[kube-system]/app-[calico-node]/vol-[Volumes]',
    ],
    tooltip: 'Other objects that also use this configuration.',
};

export const TABLE_PROPS = {
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
};

export const SUMMARY_DATA = {
    'app-counters': {
        kind: 'counters',
        id: 'app-counters',
        title: 'Configuration Summary',
        order: 10,
        config: [
            {
                title: 'Clusters',
                value: 3,
            },
            {
                title: 'Namespaces',
                value: 30,
            },
            {
                title: 'Applications',
                value: 54,
            },
            {
                title: 'Pods',
                value: 3,
            },
        ],
    },
    'infra-counters': {
        kind: 'counters',
        id: 'infra-counters',
        title: 'Infrastructure Summary',
        order: 11,
        config: [
            {
                title: 'Nodes',
                value: 3,
            },
            {
                title: 'Volumes'
            },
            {
                title: 'Cluster CPU',
                value: 3123.86,
                unit: 'cores',
            },
            {
                title: 'Cluster RAM',
                value: 11831631872,
                unit: 'bytes',
            },
        ],
    },
    'top-issue-namespaces': {
        kind: 'object-list',
        id: 'top-issue-namespaces',
        title: 'Top Namespaces with Issues',
        order: 12,
        config: [
            {
                dn: 'root/ns-[kube-system]',
                alertCount: {
                    error: 11,
                    warn: 19,
                },
            },
            {
                dn: 'root/ns-[addr]',
                alertCount: {
                    error: 16,
                    warn: 1,
                },
            },
            {
                dn: 'root/ns-[test-webapp-backend]',
                alertCount: {
                    error: 6,
                    warn: 3,
                },
            },
        ],
    },
    'top-issues': {
        kind: 'alert-target-list',
        id: 'top-issues',
        title: 'Top Issues',
        order: 13,
        config: [
            {
                alert: {
                    id: 'rule-container-memory-usage',
                    severity: 'warn',
                    msg:
                        'Rule container-memory-usage failed. Memory request is not set. This is not a good practice. Please correct ASAP.',
                    source: {
                        kind: 'rule',
                        id: 'container-memory-usage',
                    },
                },
                targets: [
                    'root/ns-[kube-system]/app-[fluentd-gcp-v3.2.0]/cont-[prometheus-to-sd-exporter]',
                    'root/ns-[kube-system]/app-[prometheus-to-sd]/cont-[prometheus-to-sd]',
                    'root/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[event-exporter]',
                    'root/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[prometheus-to-sd-exporter]',
                    'root/ns-[kube-system]/app-[fluentd-gcp-scaler]/cont-[fluentd-gcp-scaler]',
                    'root/ns-[kube-system]/app-[heapster]/cont-[heapster]',
                    'root/ns-[kube-system]/app-[heapster]/cont-[prom-to-sd]',
                    'root/ns-[kube-system]/app-[kube-dns]/cont-[prometheus-to-sd]',
                    'root/ns-[addr]/app-[gprod-addr-main-app]/cont-[cloudsql-proxy-gprod-addr-uswest1c-main-book]',
                    'root/ns-[test-ingress-isolated-ns-01]/app-[nginx]/cont-[nginx]',
                    'root/ns-[test-ingress-isolated-ns-02]/app-[nginx]/cont-[nginx]',
                    'root/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                    'root/ns-[test-ingress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                    'root/ns-[test-egress-isolated-ns]/app-[nginx]/cont-[nginx]',
                    'root/ns-[test-egress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                    'root/ns-[test-egress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                    'root/ns-[test-webapp-backend]/app-[db]/cont-[nginx]',
                    'root/ns-[test-webapp-backend]/app-[backend]/cont-[nginx]',
                    'root/ns-[test-webapp-backend]/app-[logger]/cont-[nginx]',
                    'root/ns-[test-webapp-frontend]/app-[frontend]/cont-[nginx]',
                ],
            },
            {
                alert: {
                    id: 'Unused',
                    severity: 'warn',
                    msg: 'ConfigMap not used.',
                    source: {
                        kind: 'parser',
                    },
                },
                targets: [
                    'root/ns-[berlioz]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[sql-schema]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-10]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-11]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-12]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-galley-configuration]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security-custom-resources]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-sidecar-injector]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio]',
                    'root/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[prometheus]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[berlioz.v1]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[cluster-autoscaler-status]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[extension-apiserver-authentication]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[fluentd-gcp-config-v1.2.5]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[gke-common-webhook-lock]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-gce-lock]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-uid]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-init.v1]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio.v1]',
                    'root/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[kube-dns-autoscaler]',
                ],
            },
            {
                alert: {
                    id: 'Missing',
                    severity: 'error',
                    msg: 'Service account default is not found.',
                    source: {
                        kind: 'parser',
                    },
                },
                targets: [
                    'root/ns-[berlioz]/app-[gprod-berlioz-main-agent]',
                    'root/ns-[kube-system]/app-[nvidia-gpu-device-plugin]',
                    'root/ns-[addr]/app-[gprod-addr-main-app]',
                    'root/ns-[addr]/app-[gprod-addr-main-web]',
                    'root/ns-[sprt]/app-[gprod-sprt-main-dtrace]',
                    'root/ns-[sprt]/app-[gprod-sprt-main-grfna]',
                    'root/ns-[sprt]/app-[gprod-sprt-main-prmts]',
                    'root/ns-[kube-system]/app-[l7-default-backend]',
                    'root/ns-[test-ingress-isolated-ns-01]/app-[nginx]',
                    'root/ns-[test-ingress-isolated-ns-02]/app-[nginx]',
                    'root/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]',
                    'root/ns-[test-ingress-isolated-pod]/app-[open-nginx]',
                    'root/ns-[test-egress-isolated-ns]/app-[nginx]',
                    'root/ns-[test-egress-isolated-pod]/app-[isolated-nginx]',
                    'root/ns-[test-egress-isolated-pod]/app-[open-nginx]',
                    'root/ns-[test-webapp-backend]/app-[db]',
                    'root/ns-[test-webapp-backend]/app-[backend]',
                    'root/ns-[test-webapp-backend]/app-[logger]',
                    'root/ns-[test-webapp-frontend]/app-[frontend]',
                ],
            },
        ],
    },
};
