# Groupe de feldma_l 960767

# FDI-LEEX Cybersécurité

Sujet : Normes d'authentification (OAuth2, OpenID Connect, SAML, ...)

## Technologies Choisies

Selon le sujet :
- Python, .Net Blazor
- Openssl
- OAuth2, OpenID Connect, SAML

## Protocole d'expérimentation


Voir pdf.

## Applications de test des protocols

- Une react app
- Une application WASM (.Net Blazor)

# Créer un cluster Azure ou GKE

Voir doc officielle Azure ou GCP.

# Setup du cluster avec HTTPS

```bash
# Installation d'un ingress controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
kubectl get service nginx-ingress-ingress-nginx-controller -n ingress-nginx
export NGINX_INGRESS_IP=$(kubectl get service nginx-ingress-ingress-nginx-controller -n ingress-nginx -ojson | jq -r '.status.loadBalancer.ingress[].ip')

# Cette adresse est a enregistrer dans votre DNS (type A)
echo $NGINX_INGRESS_IP

# Installation du Cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.7.1 --set installCRDs=true

# Installation du Issuer (kind ClusterIssuer => pas de namespace)
kubectl create ns my-simple-api
kubectl apply -f cert-manager/lets-encrypt-cluster-issuer-prod.yaml
kubectl apply -f cert-manager/cert-manager-prod-my-api.yaml

# Déploiement d'une Api (le host doit coller avec votre sub-domaine)
helm upgrade --install --wait -n my-simple-api my-simple-api ./my-simple-api
 
```


# Installation de Keycloak et d'un BDD Postgresql

```bash
# Creation du namespace
kubectl create ns auth
# Installation d'un bdd PostgreSQL
kubectl apply -f keycloak-postgresql/postgresql.yaml

# Installation de keycloak avec la bdd PostgreSQL
kubectl apply -f cert-manager/cert-manager-prod-keycloak.yaml -f keycloak-postgresql/keycloak.yaml
```

# Suppression des ressources

```bash
# postgresql
helm delete -n my-keycloak my-postgresql
kubectl delete pvc -l release=my-postgresql 

# keycloak
helm delete my-keycloak -n my-keycloak

# my-simple-api
helm delete -n my-simple-api my-simple-api

# cert-manager
helm delete cert-manager -n cert-manager

```

Tuto React Firebase : https://blog.logrocket.com/user-authentication-firebase-react-apps/