import _ from 'the-lodash';
import { PropsId, PropsKind } from '@kubevious/entity-meta';
import { SnapshotPropsConfig } from '@kubevious/state-registry';

export const KEY_VALUE_PROPS: SnapshotPropsConfig = {
    kind: PropsKind.keyValue,
    id: PropsId.properties,
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

const KUBERNETES_YAML_MANIFEST = {
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
    apiVersion: 'v1',
    kind: 'PersistentVolumeClaim',
};

export const YAML_PROPS: SnapshotPropsConfig = {
    kind: PropsKind.yaml,
    id: PropsId.config,
    config: KUBERNETES_YAML_MANIFEST,
};

export const COUNTERS_PROPS: SnapshotPropsConfig = {
    kind: PropsKind.counters,
    id: PropsId.infraCounters,
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

export const OBJECT_LIST_PROPS: SnapshotPropsConfig = {
    kind: PropsKind.objectList,
    id: PropsId.topIssueNamespaces,
    config: [
        {
            dn: 'root/logic/ns-[kube-system]',
            alertCount: {
                error: 11,
                warn: 19,
            },
        },
        {
            dn: 'root/logic/ns-[addr]',
            alertCount: {
                error: 16,
                warn: 1,
            },
        },
        {
            dn: 'root/logic/ns-[test-webapp-backend]',
            alertCount: {
                error: 6,
                warn: 3,
            },
        },
    ],
};

export const ALERT_TARGET_LIST_PROPS: SnapshotPropsConfig = {
    kind: PropsKind.alertTargetList,
    id: PropsId.topIssues,
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
                'root/logic/ns-[kube-system]/app-[fluentd-gcp-v3.2.0]/cont-[prometheus-to-sd-exporter]',
                'root/logic/ns-[kube-system]/app-[prometheus-to-sd]/cont-[prometheus-to-sd]',
                'root/logic/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[event-exporter]',
                'root/logic/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[prometheus-to-sd-exporter]',
                'root/logic/ns-[kube-system]/app-[fluentd-gcp-scaler]/cont-[fluentd-gcp-scaler]',
                'root/logic/ns-[kube-system]/app-[heapster]/cont-[heapster]',
                'root/logic/ns-[kube-system]/app-[heapster]/cont-[prom-to-sd]',
                'root/logic/ns-[kube-system]/app-[kube-dns]/cont-[prometheus-to-sd]',
                'root/logic/ns-[addr]/app-[gprod-addr-main-app]/cont-[cloudsql-proxy-gprod-addr-uswest1c-main-book]',
                'root/logic/ns-[test-ingress-isolated-ns-01]/app-[nginx]/cont-[nginx]',
                'root/logic/ns-[test-ingress-isolated-ns-02]/app-[nginx]/cont-[nginx]',
                'root/logic/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                'root/logic/ns-[test-ingress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                'root/logic/ns-[test-egress-isolated-ns]/app-[nginx]/cont-[nginx]',
                'root/logic/ns-[test-egress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                'root/logic/ns-[test-egress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                'root/logic/ns-[test-webapp-backend]/app-[db]/cont-[nginx]',
                'root/logic/ns-[test-webapp-backend]/app-[backend]/cont-[nginx]',
                'root/logic/ns-[test-webapp-backend]/app-[logger]/cont-[nginx]',
                'root/logic/ns-[test-webapp-frontend]/app-[frontend]/cont-[nginx]',
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
                'root/logic/ns-[berlioz]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[sql-schema]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-10]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-11]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-12]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-galley-configuration]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security-custom-resources]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-sidecar-injector]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio]',
                'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[prometheus]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[berlioz.v1]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[cluster-autoscaler-status]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[extension-apiserver-authentication]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[fluentd-gcp-config-v1.2.5]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[gke-common-webhook-lock]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-gce-lock]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-uid]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-init.v1]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio.v1]',
                'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[kube-dns-autoscaler]',
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
                'root/logic/ns-[berlioz]/app-[gprod-berlioz-main-agent]',
                'root/logic/ns-[kube-system]/app-[nvidia-gpu-device-plugin]',
                'root/logic/ns-[addr]/app-[gprod-addr-main-app]',
                'root/logic/ns-[addr]/app-[gprod-addr-main-web]',
                'root/logic/ns-[sprt]/app-[gprod-sprt-main-dtrace]',
                'root/logic/ns-[sprt]/app-[gprod-sprt-main-grfna]',
                'root/logic/ns-[sprt]/app-[gprod-sprt-main-prmts]',
                'root/logic/ns-[kube-system]/app-[l7-default-backend]',
                'root/logic/ns-[test-ingress-isolated-ns-01]/app-[nginx]',
                'root/logic/ns-[test-ingress-isolated-ns-02]/app-[nginx]',
                'root/logic/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]',
                'root/logic/ns-[test-ingress-isolated-pod]/app-[open-nginx]',
                'root/logic/ns-[test-egress-isolated-ns]/app-[nginx]',
                'root/logic/ns-[test-egress-isolated-pod]/app-[isolated-nginx]',
                'root/logic/ns-[test-egress-isolated-pod]/app-[open-nginx]',
                'root/logic/ns-[test-webapp-backend]/app-[db]',
                'root/logic/ns-[test-webapp-backend]/app-[backend]',
                'root/logic/ns-[test-webapp-backend]/app-[logger]',
                'root/logic/ns-[test-webapp-frontend]/app-[frontend]',
            ],
        },
    ],
};

export const DN_LIST_PROPS : SnapshotPropsConfig = {
    kind: PropsKind.dnList,
    id: PropsId.sharedWith,
    config: [
        'root/logic/ns-[kubevious]/app-[kubevious-ui]/cont-[kubevious-ui]/configmap-[kubevious-mysql-client]',
        'root/logic/ns-[book]/app-[book-app]/launcher-[DaemonSet]',
        'root/logic/ns-[kube-system]/app-[calico-node]/vol-[Volumes]',
        'root/logic/ns-[addr]/app-[gprod-addr-main-app]',
        'root/logic/ns-[addr]/app-[gprod-addr-main-web]',
        "root/k8s/ns-[hipster]/api-[apps]/version-[v1]/kind-[Deployment]/resource-[checkoutservice]",
        "root/k8s/ns-[hipster]/version-[v1]/kind-[Service]/resource-[checkoutservice]",
        "root/k8s/ns-[hipster]/version-[v1]/kind-[ServiceAccount]/resource-[default]",
    ]
};

export const TABLE_PROPS : SnapshotPropsConfig = {
    kind: PropsKind.table,
    id: PropsId.resourceRoleMatrix,
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
        kind: PropsKind.counters,
        id: PropsId.appCounters,
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
        config: [
            {
                dn: 'root/logic/ns-[kube-system]',
                alertCount: {
                    error: 11,
                    warn: 19,
                },
            },
            {
                dn: 'root/logic/ns-[addr]',
                alertCount: {
                    error: 16,
                    warn: 1,
                },
            },
            {
                dn: 'root/logic/ns-[test-webapp-backend]',
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
                    'root/logic/ns-[kube-system]/app-[fluentd-gcp-v3.2.0]/cont-[prometheus-to-sd-exporter]',
                    'root/logic/ns-[kube-system]/app-[prometheus-to-sd]/cont-[prometheus-to-sd]',
                    'root/logic/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[event-exporter]',
                    'root/logic/ns-[kube-system]/app-[event-exporter-v0.2.4]/cont-[prometheus-to-sd-exporter]',
                    'root/logic/ns-[kube-system]/app-[fluentd-gcp-scaler]/cont-[fluentd-gcp-scaler]',
                    'root/logic/ns-[kube-system]/app-[heapster]/cont-[heapster]',
                    'root/logic/ns-[kube-system]/app-[heapster]/cont-[prom-to-sd]',
                    'root/logic/ns-[kube-system]/app-[kube-dns]/cont-[prometheus-to-sd]',
                    'root/logic/ns-[addr]/app-[gprod-addr-main-app]/cont-[cloudsql-proxy-gprod-addr-uswest1c-main-book]',
                    'root/logic/ns-[test-ingress-isolated-ns-01]/app-[nginx]/cont-[nginx]',
                    'root/logic/ns-[test-ingress-isolated-ns-02]/app-[nginx]/cont-[nginx]',
                    'root/logic/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                    'root/logic/ns-[test-ingress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                    'root/logic/ns-[test-egress-isolated-ns]/app-[nginx]/cont-[nginx]',
                    'root/logic/ns-[test-egress-isolated-pod]/app-[isolated-nginx]/cont-[nginx]',
                    'root/logic/ns-[test-egress-isolated-pod]/app-[open-nginx]/cont-[nginx]',
                    'root/logic/ns-[test-webapp-backend]/app-[db]/cont-[nginx]',
                    'root/logic/ns-[test-webapp-backend]/app-[backend]/cont-[nginx]',
                    'root/logic/ns-[test-webapp-backend]/app-[logger]/cont-[nginx]',
                    'root/logic/ns-[test-webapp-frontend]/app-[frontend]/cont-[nginx]',
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
                    'root/logic/ns-[berlioz]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[sql-schema]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-10]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-11]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-crd-12]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-galley-configuration]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security-custom-resources]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-security]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-sidecar-injector]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio]',
                    'root/logic/ns-[istio-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[prometheus]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[berlioz.v1]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[cluster-autoscaler-status]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[extension-apiserver-authentication]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[fluentd-gcp-config-v1.2.5]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[gke-common-webhook-lock]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-gce-lock]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[ingress-uid]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio-init.v1]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[istio.v1]',
                    'root/logic/ns-[kube-system]/raw-[Raw Configs]/raw-[ConfigMaps]/configmap-[kube-dns-autoscaler]',
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
                    'root/logic/ns-[berlioz]/app-[gprod-berlioz-main-agent]',
                    'root/logic/ns-[kube-system]/app-[nvidia-gpu-device-plugin]',
                    'root/logic/ns-[addr]/app-[gprod-addr-main-app]',
                    'root/logic/ns-[addr]/app-[gprod-addr-main-web]',
                    'root/logic/ns-[sprt]/app-[gprod-sprt-main-dtrace]',
                    'root/logic/ns-[sprt]/app-[gprod-sprt-main-grfna]',
                    'root/logic/ns-[sprt]/app-[gprod-sprt-main-prmts]',
                    'root/logic/ns-[kube-system]/app-[l7-default-backend]',
                    'root/logic/ns-[test-ingress-isolated-ns-01]/app-[nginx]',
                    'root/logic/ns-[test-ingress-isolated-ns-02]/app-[nginx]',
                    'root/logic/ns-[test-ingress-isolated-pod]/app-[isolated-nginx]',
                    'root/logic/ns-[test-ingress-isolated-pod]/app-[open-nginx]',
                    'root/logic/ns-[test-egress-isolated-ns]/app-[nginx]',
                    'root/logic/ns-[test-egress-isolated-pod]/app-[isolated-nginx]',
                    'root/logic/ns-[test-egress-isolated-pod]/app-[open-nginx]',
                    'root/logic/ns-[test-webapp-backend]/app-[db]',
                    'root/logic/ns-[test-webapp-backend]/app-[backend]',
                    'root/logic/ns-[test-webapp-backend]/app-[logger]',
                    'root/logic/ns-[test-webapp-frontend]/app-[frontend]',
                ],
            },
        ],
    },
};


export const TARGET_LINKS_PROPS: SnapshotPropsConfig = {
    kind: PropsKind.links,
    id: PropsId.targetLinks,
    "config": {
        "service": [
            {
                "dn": "root/k8s/ns-[gitlab]/version-[v1]/kind-[Service]/resource-[gitlab-nginx-ingress-controller]",
                "path": "gitlab-nginx-ingress-controller"
            }
        ],
        "image": [
            {
                "dn": "root/images/repo-[quay.io]/image-[kubernetes-ingress-controller/nginx-ingress-controller]/tag-[0.21.0]/ns-[gitlab]/app-[gitlab-nginx-ingress-controller]",
                "path": "cont-nginx-ingress-controller"
            }
        ],
        "volume": [
            {
                "dn": "root/logic/ns-[book]/app-[book-app]/vols-[Volumes]/vol-[config-volume]"
            }
        ],
        "k8s-owner": [
            {
                "dn": "root/k8s/ns-[hipster]/api-[apps]/version-[v1]/kind-[ReplicaSet]/resource-[adservice-84b8749d65]"
            }
        ]
    }
}

export const TELEPORTATION_PROPS: SnapshotPropsConfig = {
    "kind": PropsKind.teleportation,
    "id": PropsId.config,
    "config": [
        {
            direction: "target",
            dn: "root/logic/ns-[hipster]/app-[checkoutservice]/service-[checkoutservice]"
        },
        {
            direction: 'bidir',
            dn: "root/k8s/ns-[hipster]/api-[apps]/version-[v1]/kind-[Deployment]/resource-[checkoutservice]"
        },
        {
            direction: 'source',
            dn: "root/k8s/ns-[hipster]/version-[v1]/kind-[Service]/resource-[checkoutservice]"
        },
        {
            direction: 'target',
            dn: "root/k8s/ns-[hipster]/version-[v1]/kind-[ServiceAccount]/resource-[default]"
        },
        {
            direction: 'target',
            dn: "root/infra/k8s/api-[apps]/version-[v1]/kind-[ReplicaSet]/ns-[hipster]"
        }
    ]
};