### Jules Vic RA3

Pour prouver que les commandes s'exécutent correctement sur mon PC et faciliter le diagnostic en cas de problème lié à tout élément pouvant empêcher le bon fonctionnement sur un autre environnement, j’ai décidé de rassembler dans ce README chaque commande que j’exécute à partir de l'étape dans la partie 2 de ce TP. Cela permettra de démontrer que chaque étape demandée dans ce TP (à l'exception de staefulset que je n'ai pas faite) fonctionne bien sur ma machine.

Par pitié soyez indulgent j'étais tout seul dans mon groupe :🙏🙏🙏

# pour tester le https (a condition que le secret soit bien ajouté sur le git mais je sais pas vraiment si c'est le cas):

curl.exe --resolve "microproject.com:443:127.0.0.1" -k -i https://microproject.com/

# pour cet output :

HTTP/1.1 200 OK
Date: Sat, 08 Feb 2025 11:34:15 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 18
Connection: keep-alive
X-Powered-By: Express
ETag: W/"12-uodC3Ycr2eiNSi6vhj5CiD+vnMA"

Hello, Kubernetes!

# Pour tester le liveness probe :

on a créé une route nohealthz dans le app.js qui renvoie une erreur

on appelle cette route :
curl.exe --resolve "microproject.com:443:127.0.0.1" -k -i https://microproject.com/nohealthz
on obtient bien une erreur 500

on regarde les informations du pod pour vérifier qu'il a redémarré :
kubectl describe pod k8s-microproject-deployment-7f44bf4f8f-77zqf

# et on a un output de ce style (regarder a la toute fin de l'output, on a l'information du redémarrage):

Name: k8s-microproject-deployment-7f44bf4f8f-77zqf
Namespace: default
Priority: 0
Service Account: default
Node: minikube/192.168.49.2
Start Time: Sun, 16 Feb 2025 16:56:50 +0100
Labels: app=k8s-microproject
pod-template-hash=7f44bf4f8f
Annotations: <none>
Status: Running
IP: 10.244.0.65
IPs:
IP: 10.244.0.65
Controlled By: ReplicaSet/k8s-microproject-deployment-7f44bf4f8f
Containers:
k8s-container:
Container ID: docker://1bba6a649d1016d16787c0dd8c7a6130697e638466f6a11d70950144c8208e73
Image: c3ll0gr4m/k8s-microproject
Image ID: docker-pullable://c3ll0gr4m/k8s-microproject@sha256:23fb07c232e0fb5a7048dae3ea14f36f21dfc2f33cb809100ebc211b91a493cf
Port: 3000/TCP
Host Port: 0/TCP
State: Running
Started: Sun, 16 Feb 2025 16:58:52 +0100
Last State: Terminated
Reason: Error
Exit Code: 137
Started: Sun, 16 Feb 2025 16:57:52 +0100
Finished: Sun, 16 Feb 2025 16:58:51 +0100
Ready: True
Restart Count: 2
Liveness: http-get http://:3000/nohealthz delay=5s timeout=1s period=10s #success=1 #failure=3
Environment: <none>
Mounts:
/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-6tbqm (ro)
Conditions:
Type Status
PodReadyToStartContainers True
Initialized True
Ready True
ContainersReady True
PodScheduled True
Volumes:
kube-api-access-6tbqm:
Type: Projected (a volume that contains injected data from multiple sources)
TokenExpirationSeconds: 3607
ConfigMapName: kube-root-ca.crt
ConfigMapOptional: <nil>
DownwardAPI: true
QoS Class: BestEffort
QoS Class: BestEffort
Node-Selectors: <none>
Node-Selectors: <none>
Tolerations: node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
Type Reason Age From Message

---

Normal Scheduled 2m37s default-scheduler Successfully assigned default/k8s-microproject-deployment-7f44bf4f8f-77zqf to minikube
Normal Pulled 2m36s kubelet Successfully pulled image "c3ll0gr4m/k8s-microproject" in 1.048s (1.048s including waiting). Image size: 1009329657 bytes.
Normal Pulled 96s kubelet Successfully pulled image "c3ll0gr4m/k8s-microproject" in 1.078s (1.078s including waiting). Image size: 1009329657 bytes.
Normal Pulling 37s (x3 over 2m37s) kubelet Pulling image "c3ll0gr4m/k8s-microproject"
Normal Created 36s (x3 over 2m36s) kubelet Created container k8s-container
Normal Started 36s (x3 over 2m36s) kubelet Started container k8s-container
Normal Pulled 36s kubelet Successfully pulled image "c3ll0gr4m/k8s-microproject" in 1.026s (1.026s including waiting). Image size: 1009329657 bytes.
Warning Unhealthy 7s (x9 over 2m27s) kubelet Liveness probe failed: HTTP probe failed with statuscode: 500
Normal Killing 7s (x3 over 2m7s) kubelet Container k8s-container failed liveness probe, will be restarted

# Persistent volume :

en faisant la commande
kubectl get pvc
on obtient le volume qui correspond a notre configuration

on peut ensuite faire un
kubectl get pods
pour avoir le nom du pod running

puis
kubectl describe pod k8s-microproject-deployment-f6c9995cc-nbkkg

pour vérifier que les informations du volume sont bien présentes (voir ligne 156):

# Output :

Name: k8s-microproject-deployment-f6c9995cc-nbkkg
Namespace: default
Priority: 0
Service Account: default
Node: minikube/192.168.49.2
Start Time: Sun, 16 Feb 2025 17:12:52 +0100
Labels: app=k8s-microproject
pod-template-hash=f6c9995cc
Annotations: <none>
Status: Running
IP: 10.244.0.66
IPs:
IP: 10.244.0.66
Controlled By: ReplicaSet/k8s-microproject-deployment-f6c9995cc
Containers:
k8s-container:
Container ID: docker://caf18f49e908fb93c25a9099a511c41077281428dc2e1f21ae971eec76e49df7
Image: c3ll0gr4m/k8s-microproject
Image ID: docker-pullable://c3ll0gr4m/k8s-microproject@sha256:23fb07c232e0fb5a7048dae3ea14f36f21dfc2f33cb809100ebc211b91a493cf
Port: 3000/TCP
Host Port: 0/TCP
State: Running
Started: Sun, 16 Feb 2025 17:12:54 +0100
Ready: True
Restart Count: 0
Liveness: http-get http://:3000/nohealthz delay=5s timeout=1s period=10s #success=1 #failure=3
Environment: <none>
Mounts:
/usr/src/app/data from my-volume (rw)
/var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-mf8sc (ro)
Conditions:
Type Status
PodReadyToStartContainers True
Initialized True
Ready True
ContainersReady True
PodScheduled True
Volumes:
my-volume:
Type: PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
ClaimName: my-pvc
ReadOnly: false
kube-api-access-mf8sc:
Type: Projected (a volume that contains injected data from multiple sources)
TokenExpirationSeconds: 3607
ConfigMapName: kube-root-ca.crt
ConfigMapOptional: <nil>
DownwardAPI: true
QoS Class: BestEffort
Node-Selectors: <none>
Tolerations: node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
Type Reason Age From Message

---

Normal Scheduled 55s default-scheduler Successfully assigned default/k8s-microproject-deployment-f6c9995cc-nbkkg to minikube
Normal Pulling 54s kubelet Pulling image "c3ll0gr4m/k8s-microproject"
Normal Pulled 53s kubelet Successfully pulled image "c3ll0gr4m/k8s-microproject" in 1.114s (1.114s including waiting). Image size: 1009329657 bytes.
Normal Created 53s kubelet Created container k8s-container
Normal Started 53s kubelet Started container k8s-container
Warning Unhealthy 24s (x3 over 44s) kubelet Liveness probe failed: HTTP probe failed with statuscode: 500
Normal Killing 24s kubelet Container k8s-container failed liveness probe, will be restarted

# ConfigMap

en faisant la commande
kubectl get configmap my-configmap -o yaml

on obtient l'output suivant :

apiVersion: v1
data:
APP_ENV: production
APP_NAME: Kubernetes App
APP_PORT: "3000"
kind: ConfigMap
metadata:
annotations:
kubectl.kubernetes.io/last-applied-configuration: |
{"apiVersion":"v1","data":{"APP_ENV":"production","APP_NAME":"Kubernetes App","APP_PORT":"3000"},"kind":"ConfigMap","metadata":{"annotations":{},"name":"my-configmap","namespace":"default"}}
creationTimestamp: "2025-02-16T16:23:01Z"
name: my-configmap
namespace: default
resourceVersion: "38184"
uid: 68c62f3f-5250-4d7d-a170-b0b9ac78b195

## Steps

### Step 1 - Initial project setup

1. Clone this repository

```bash
git clone git@github.com:nas-tabchiche/k8s-microproject.git
```

2. Create your own repository on Github

3. Change the repote to your repository

```bash
git remote set-url origin git@github.com:<github-username>/<repo-name>.git
```

### Step 2 - Install and run the application

Requirements:

- Node 22+
- npm
- cURL

1. Install dependencies

```bash
npm install
```

2. Run the application

```
node app.js
```

3. Send a GET request to the exposed endpoint

```bash
curl http://localhost:3000/
```

The output should be 'Hello, Kubernetes!'

### Step 3 - Dockerize and publish the image

1. Write a Dockerfile

2. Build your image with the `k8s-microproject` tag

```bash
docker build . -t <username>/k8s-microproject
```

3. Publish the image on dockerhub

```bash
docker push <username>/k8s-microproject
```

### Step 4 - Create and expose your first deployment

1. Write a `deployment.yaml` file describing your deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: k8s-microproject-deployment
spec: ...
```

2. Write a `service.yaml`file describing your service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: k8s-microproject-service
spec:
```

3. Apply your deployment and service

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

4. Check that your pods are running

```bash
kubectl get pods
```

> [!NOTE]
> Their status should be 'Running'. It might take a few seconds to get there.

5. Expose your application

```bash
# If you use minikube
minikube service k8s-microproject-service --url
```

6. Send a GET request to the exposed endpoint

```bash
curl <URL of the exposed service>
```

The output should be 'Hello, Kubernetes!'

### Step 5 - Create an ingress

1. Write a `ingress.yaml` file describing your ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: k8s-microproject-ingress
spec: ...
```

2. Apply your ingress

```bash
kubectl apply -f ingress.yaml
```

3. Check that your ingress is operational

```bash
kubectl get ingress
```

4. Send a GET request to the ingress

```bash
curl --resolve "<ingress-host>:80:<ingress-address>" -i http://<ingress-host>/
```
